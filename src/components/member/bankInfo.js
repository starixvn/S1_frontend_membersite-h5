import React, { useState, useContext, useEffect } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { api_GetBankInfoSysList } from "../../service/api/payment";
import {
	api_SetCustBankInfo,
	api_SetProfile,
	api_GetCustProfile,
	api_DelCustBankInfo
} from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import Inputbox from "./inputbox";
import Dropdown from "../common/dropdown.image";
import config from "../../config";

const initWarningState = {
	status: false,
	msg: ""
};

const BankInfo = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [siteBankInfoState, setSiteBankInfoState] = useState([]);
	const [getBankInfo, setGetBankInfo] = useState([]);
	const [status, setStatus] = useState(true);
	const [userValueState, setUserValueState] = useState({});
	const [bankSelectedIdx, setBankSelectedIdx] = useState(0);
	const [warningState, setWarningState] = useState(initWarningState);
	const [checklistState, setChecklistState] = useState(false);

	useEffect(() => {
		api_GetBankInfoSysList().then(res => {
			const data = res.data.data;
			let bankInfoArr = data.map(i => {
				return {
					id: i.sysId,
					sysId: i.sysId,
					bankName: i.bankName,
					image: i.bankLogo,
					displayText: i.bankName
				};
			});
			setSiteBankInfoState(preV => bankInfoArr);
		});
	}, []);

	useEffect(() => {
		api_GetCustBankInfo().then(res => {
			if (res.data.errorCode === 0) {
				let data = res.data.data;
				if (data !== null) {
					let bankInfoDetail = data.bankInfoDetail ?? [];
					let getBankInfoArr = bankInfoDetail.map(i => {
						return {
							bankName: i.bankName,
							image: i.bankLogo,
							accountNo: i.accountNo,
							SysId: i.sysId
						};
					});
					setGetBankInfo(preV => getBankInfoArr);
				}
			}
		});
	}, [getBankInfo]);

	useEffect(() => {
		if (!userInfo.accountName) {
			setStatus(true);
		}
	}, [userInfo.accountName]);

	const toAddBankAccount = () => {
		setStatus(false);
		setBankSelectedIdx(0);
		setWarningState(initWarningState);
		setUserValueState({});
		setChecklistState(false);
	};

	const toShowBankAccount = () => {
		setStatus(true);
		setPopBox({ isOpen: false });
	};

	const dropdownStateHandler = i => {
		setBankSelectedIdx(i);
	};

	const checkInputboxHandler = (col, e) => {
		const val = e.target.value;
		let checked = true;
		let message = "";

		if (col === "RealName") {
			if (val === "" || !isNaN(val)) {
				checked = false;
				message = i18n["msg_EnterRealName"];
			}
		} else if (col === "BankAccount") {
			if (val === "" || isNaN(val)) {
				checked = false;
				message = i18n["msg_NeedAccountNo"];
			}
		}

		setUserValueState(prevState => ({
			...prevState,
			[col]: val
		}));
		setWarningState(prevState => {
			return {
				status: !checked,
				msg: message
			};
		});
		setChecklistState(checked);
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setUserValueState(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const removeAccountHandler = val => {
		const removeAccount = () => {
			let removeAccountData = {
				AccountName: userInfo.accountName,
				AccountNo: val.accountNo,
				SysId: val.SysId
			};
			api_DelCustBankInfo(removeAccountData);
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: "",
			content: i18n["lbl_CheckConfirm"],
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={toShowBankAccount}>
						{i18n["lbl_Cancel"]}
					</button>
					<button className="orange" onClick={removeAccount}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			)
		});
	};

	const checkSubmitHandler = () => {
		let checked = true;

		if (status === true && !userInfo.accountName) {
			if (checklistState === false) {
				checked = false;
				setWarningState(prevState => {
					return {
						status: !checked,
						msg: i18n["msg_EnterRealName"]
					};
				});
			} else {
				checked = true;
			}
		} else if (status === false) {
			if (checklistState === false) {
				checked = false;

				setWarningState(prevState => {
					return {
						status: !checked,
						msg: i18n["msg_NeedAccountNo"]
					};
				});
			} else {
				checked = true;
			}
		}

		if (checked) {
			if (status === true && !userInfo.accountName) {
				let profileData = {
					AccountName: userValueState.RealName
				};
				api_SetProfile(profileData).then(response => {
					api_GetCustProfile().then(res => {
						if (res.data.errorCode === 0) {
							setUserInfo(prevState => ({
								...prevState,
								...res.data.data
							}));
						}
					});
				});
				setStatus(true);
			} else if (status === false) {
				let bankInfoData = {
					AccountName: userInfo.accountName,
					AccountNo: userValueState.BankAccount,
					SysId: siteBankInfoState[bankSelectedIdx].id
				};

				api_SetCustBankInfo(bankInfoData).then(response => {
					const errorCode = response.data.errorCode;
					const message = response.data.message;

					if (errorCode !== 0) {
						setWarningState(prevState => {
							return {
								status: true,
								msg: message
							};
						});
					} else {
						api_GetCustBankInfo().then(res => {
							if (res.data.errorCode === 0) {
								setGetBankInfo(res.data.data.bankInfoDetail);
							}
						});
					}
				});
				setStatus(true);
			}
		}
	};

	let arr = getBankInfo.map(item => {
		return (
			<BankAccountItem
				key={`bankAccount-${item.accountNo}`}
				title={item.bankName}
				accountNo={item.accountNo}
				removeAccountHandler={removeAccountHandler.bind(null, item)}
				image={`${config.apiURL}/common/images/BankLogo/${item.image}`}
				className="bankLogo"
			/>
		);
	});

	return (
		<>
			<div className="avatar"></div>
			<div className="name">{userInfo.accountName}</div>

			{status === true && !userInfo.accountName ? (
				<>
					<Inputbox
						icon="icon-member"
						inputType="text"
						placeholder={i18n["lbl_RealName"]}
						onBlur={checkInputboxHandler.bind(null, "RealName")}
						onChange={EditField.bind(null, "RealName")}
						Warning={warningState}
					/>

					<div className="btn-group">
						<button className="orange" onClick={checkSubmitHandler}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				</>
			) : null}

			{status === true && userInfo.accountName ? (
				<div className="text-org">{i18n["lbl_ContactCSD"]}</div>
			) : null}

			{status === true && userInfo.accountName ? (
				<>
					{" "}
					{getBankInfo && getBankInfo.length < 3 ? (
						<div className="btn-group">
							<button
								className="orange"
								onClick={toAddBankAccount}>
								<i className="icon icon-user-plus"></i>
								{i18n["lbl_AddNewAccount"]}
							</button>
						</div>
					) : null}
				</>
			) : null}

			{status === false ? (
				<>
					{" "}
					<div className="inputBox">
						<Dropdown
							mainkey="getBankInfo"
							options={siteBankInfoState}
							colName="getBankInfo"
							className="bankLogo"
							selectedImgURL={`${config.apiURL}/common/images/BankLogo/${siteBankInfoState[bankSelectedIdx]?.image}`}
							ImgURL={`${config.apiURL}/common/images/BankLogo/`}
							selectedIdx={bankSelectedIdx}
							onSelectItem={dropdownStateHandler}
						/>
					</div>
					<Inputbox
						icon="icon-newspaper"
						Warning={warningState}
						inputType="tel"
						placeholder={i18n["lbl_BankNumber"]}
						onBlur={checkInputboxHandler.bind(null, "BankAccount")}
						onChange={EditField.bind(null, "BankAccount")}
					/>
					<div className="btn-group">
						<button className="blue" onClick={toShowBankAccount}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="orange" onClick={checkSubmitHandler}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				</>
			) : null}

			{status === true ? (
				<>
					{getBankInfo && getBankInfo.length > 0 ? (
						<div className="smallTitle">
							<i className="icon icon-library"></i>
							{i18n["lbl_BankAccount"]}
						</div>
					) : null}
					<div className="bankAccount">{arr}</div>
				</>
			) : null}
		</>
	);
};

const BankAccountItem = props => {
	return (
		<div className="account">
			<div className={props.className}>
				<img src={props.image} alt="" />
			</div>
			<div className="info">
				<ul>
					<li>
						<span className="title">{props.title}</span>
						<span>{props.accountNo}</span>
					</li>
				</ul>
			</div>
			<button
				className="icon icon-bin clickBtn"
				onClick={props.removeAccountHandler}></button>
		</div>
	);
};

export default BankInfo;
