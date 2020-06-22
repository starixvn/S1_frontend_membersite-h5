import React, { useContext, useEffect, useState } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { number_format, isConvert, checkAmount } from "../common/common";
import {
	api_GetWithdrawalAvailableBalance,
	api_GetCustBankInfo
} from "../../service/api/account";
import {
	api_WithdrawalReq,
	api_GetWithdrawalInfoRecent,
	api_SetWithdrawalCancel
} from "../../service/api/payment";
import InputBox from "../common/inputbox";
import config from "../../config";
import RecentDatas from "./withdrawal.recentDatas";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";
import { Redirect } from "@reach/router";
import Loading from "../common/loading";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [balanceInfo, setBalanceInfo] = useState(null);
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({
		accountName: "",
		bankList: []
	});
	const [recentDatas, setRecentDatas] = useState([]);

	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}
		return () => (mounted = false);
	}, [redirectPath]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (
				userInfo.isLogin &&
				userInfo.currencyId &&
				(!userInfo.accountName ||
					!userInfo.birth_d ||
					!userInfo.phoneNo)
			) {
				const ClosePopBox = () => {
					setPopBox({ isOpen: false });
					setRedirectPath(`/${path.member.root}`);
				};

				if (mounted) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.lbl_UpdatePersonalInfo,
						hasBtn: true,
						hideCloseBtn: true,
						btnBar: (
							<div className="btn-group">
								<button className="blue" onClick={ClosePopBox}>
									{i18n.lbl_UpdatePersonalDetail}
								</button>
							</div>
						)
					});

					setLoading(false);
					setPageVerify(false);
				}
			} else {
				if (mounted) {
					setPageVerify(true);
				}
			}
		}

		return () => {
			mounted = false;
		};
	}, [
		userInfo.accountName,
		userInfo.birth_d,
		userInfo.phoneNo,
		userInfo.currencyId,
		userInfo.isLogin,
		i18n,
		setPopBox
	]);

	useEffect(() => {
		let mounted = true;
		if (userInfo.isLogin) {
			setLoading(true);
			api_GetWithdrawalAvailableBalance().then(
				res => {
					if (res.data.errorCode === 0 && mounted) {
						setBalanceInfo(res.data.data);
						setLoading(false);
					}
				},
				err => {
					if (mounted) {
						setLoading(false);
					}
				}
			);

			api_GetCustBankInfo().then(
				res => {
					if (res.data.errorCode === 0) {
						if (res.data.data !== null) {
							if (res.data.data.bankInfoDetail) {
								if (mounted) {
									setbankInfo(() => ({
										accountName: res.data.data.accountName,
										bankList: res.data.data.bankInfoDetail
									}));
									setSelBank(
										res.data.data.bankInfoDetail?.[0]
									);
									if (!pageVerify) {
										setPageVerify(true);
									}
								}
							} else {
								const ClosePopBox = () => {
									setPopBox({ isOpen: false });
									setRedirectPath(
										`/${path.member.root}/${path.member.sub.bankInfo.root}`
									);
								};

								if (mounted) {
									setPopBox({
										isOpen: true,
										title: i18n.lbl_ImportantNote,
										content: i18n.lbl_UpdateBankInfo,
										hasBtn: true,
										hideCloseBtn: true,
										btnBar: (
											<div className="btn-group">
												<button
													className="blue"
													onClick={ClosePopBox}>
													{i18n.lbl_UpdateBankDetail}
												</button>
											</div>
										)
									});

									setPageVerify(false);
								}
							}
						}
					}

					if (mounted) {
						setLoading(false);
					}
				},
				err => {
					if (mounted) {
						setLoading(false);
					}
				}
			);

			api_GetWithdrawalInfoRecent().then(res => {
				if (res.data.errorCode === 0 && mounted) {
					setRecentDatas(res.data.data);
				}
			});
		}

		return () => (mounted = false);
	}, [i18n, setPopBox, userInfo.isLogin, pageVerify]);

	const GetBalance = () => {
		if (pageVerify) {
			api_GetWithdrawalAvailableBalance().then(res => {
				if (res.data.errorCode === 0) {
					setBalanceInfo(res.data.data);
				}
			});
		}
	};

	let _availableBalance =
		balanceInfo?.availableBalance !== null ||
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: 0;

	const VaildAmount = _amount => {
		let result = checkAmount(
			_amount,
			selBank?.minAmount,
			selBank?.maxAmount,
			_isConvert,
			i18n
		);
		if (result.status !== 0) {
			setWarning({
				status: true,
				msg: result.msg
			});
		} else {
			setWarning({
				status: false,
				msg: ""
			});
		}
		return result.status === 0;
	};

	const EditAmount = e => {
		let value = e.target.value;
		VaildAmount(value);
		setAmount(value);
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			let result = VaildAmount(amount);
			if (result) {
				const RedirectToNext = (accountNo, _real_amount, sysId) => {
					api_WithdrawalReq(accountNo, _real_amount, sysId).then(
						res => {
							if (res.data.errorCode === 0) {
								setAmount("");
								api_GetWithdrawalInfoRecent().then(res => {
									if (res.data.errorCode === 0) {
										setRecentDatas(res.data.data);
									}
								});
								setPopBox({ isOpen: false });
							} else {
								let content = res.data.message;
								if (res.data.errorCode === -1) {
									content = `${
										i18n.lbl_RolloverOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								} else if (res.data.errorCode === -2) {
									content = `${
										i18n.lbl_DepositOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								} else if (res.data.errorCode === -3) {
									content = `${
										i18n.lbl_WithdrawalOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								}
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: content,
									hasBtn: false
								});
							}
						},
						err => {
							this.props.setPopBox({
								isOpen: true,
								title: this.props.i18n.lbl_ImportantNote,
								content: "API Server Error."
							});
						}
					);
				};

				let real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<div>
							<ul>
								<li>
									{i18n.lbl_WithdrawalTo}
									<span>{selBank?.bankName}</span>
								</li>
								<li>
									{i18n.lbl_BankAccountName}
									<span>{bankInfo?.accountName}</span>
								</li>
								<li>
									{i18n.lbl_BankNumber}
									<span>{selBank?.accountNo}</span>
								</li>
								<li>
									{i18n.lbl_WithdrawalAmount}
									<span>
										{number_format(real_amount, _isConvert)}
									</span>
								</li>
							</ul>
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="blue"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n["lbl_Cancel"]}
							</button>
							<button
								className="orange"
								onClick={RedirectToNext.bind(
									this,
									selBank.accountNo,
									real_amount,
									selBank.sysId
								)}>
								{i18n["lbl_Submit"]}
							</button>
						</div>
					)
				});
			}
		}
	};

	const SelectBank = b => {
		if (b.sysId !== selBank?.sysId) {
			setSelBank(b);
		}
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api_SetWithdrawalCancel(transId).then(
					res => {
						if (res.data.errorCode === 0) {
							api_GetWithdrawalInfoRecent().then(res => {
								if (res.data.errorCode === 0) {
									setRecentDatas(res.data.data);
								}
							});
						} else {
							this.props.setPopBox({
								isOpen: true,
								title: this.props.i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					},
					err => {
						this.props.setPopBox({
							isOpen: true,
							title: this.props.i18n.lbl_ImportantNote,
							content: "API Server Error."
						});
					}
				);
			};

			const ClickCancel = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n["lbl_CancelConfirm"],
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={ClickCancel}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="orange" onClick={ClickSubmit}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	let banks = bankInfo?.bankList?.map(b => {
		return (
			<button
				className={selBank?.sysId === b.sysId ? "open" : ""}
				key={`withdrawal-bank-${b.sysId}`}
				onClick={SelectBank.bind(this, b)}>
				<img
					src={`${config.imgUrl}/common/images/BankLogo/${b.bankLogo}`}
					alt={b.bankName}
				/>
			</button>
		);
	});

	return redirectPath === null ? (
		pageVerify ? (
			loading ? (
				<Loading />
			) : (
				<>
					<div className="avatar"></div>
					<div className="name">{userInfo.userName}</div>
					<div className="text-org">
						{i18n.lbl_EligibleWithdrawalAmount}
					</div>
					<div className="balance">
						{i18n[`Currency_${userInfo.currencyId}`]}{" "}
						{number_format(_availableBalance, _isConvert)}
						<ReloadSpin func={GetBalance} />
					</div>
					<InputBox
						icon="icon-pencil"
						value={amount}
						inputType="tel"
						onChange={EditAmount}
						Warning={warning}
					/>
					<div className="inputBox">
						<div className="selectBank">{banks}</div>
					</div>
					<div className="btn-group">
						<button className="orange" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
					<RecentDatas
						Datas={recentDatas}
						ClickCancel={ClickCancel}
					/>
				</>
			)
		) : null
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default Panel;
