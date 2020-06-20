import React, { useState, useEffect, useContext } from "react";
import Step from "./step";
import { Link, Redirect } from "@reach/router";
import DropdownIMG from "../common/dropdown.image";
import config from "../../config";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	bankSlipPopBoxContext
} from "../common/context";
import LimitTip from "./limitTip";
import { isConvert, checkAmount, number_format } from "../common/common";
import InputBox from "../common/inputbox";
import { api_DepositReqWireTransfer } from "../../service/api/payment";
import moment from "moment";

export const Panel = props => props.children;

export const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);

	const [redirect, setRedirect] = useState(false);
	const [bankList, setBankList] = useState([]);
	const [selBank, setSelBank] = useState({
		idx: null,
		bank: null
	});
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState({ status: false, msg: "" });

	const _isConvert = isConvert(userInfo.currencyId);
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		let mounted = true;
		if (props.location.state.paymentList) {
			let datas = props.location.state.paymentList.map(b => {
				let { bankLogo, sysId, bankName, ...rest } = b;
				return {
					...rest,
					image: bankLogo,
					id: sysId,
					displayText: bankName
				};
			});
			if (mounted) {
				setBankList(datas);
				setProcessing(false);
			}
		}
		return () => (mounted = false);
	}, [props.location.state.paymentList]);

	const SelectBank = idx => {
		setSelBank({
			idx: idx,
			bank: bankList[idx]
		});
	};

	const VaildAmount = _amount => {
		let result = checkAmount(
			_amount,
			selBank.bank.minAmount,
			selBank.bank.maxAmount,
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
		if (!processing) {
			let result = VaildAmount(amount);
			if (result) {
				const RedirectToNext = (real_amount, sysId) => {
					api_DepositReqWireTransfer({
						amount: real_amount,
						sysId: sysId
					}).then(
						res => {
							if (res.data.errorCode === 0) {
								setbankSlipPopBox(prevState => ({
									...prevState,
									...res.data.data,
									depositTime: `${moment().format(
										"yyyy-MM-DDT"
									)}${moment().format("HH:mm")}`,
									isOpen: true,
									amount: number_format(
										real_amount,
										_isConvert
									),
									closeCallBack: () => setRedirect(true)
								}));
								setPopBox(prevState => ({
									...prevState,
									isOpen: false
								}));
							} else {
								setPopBox(prevState => ({
									...prevState,
									title: i18n.lbl_ImportantNote,
									content: "Wrong amount."
								}));
							}
						},
						err => {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
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
						<>
							<p>{i18n.lbl_ConfirmDeposit}</p>
							<img
								src={`${config.imgUrl}/common/images/BankLogo/${selBank.bank.image}`}
								alt={selBank.bank.bankName}
							/>
							<div className="tip">
								<span>{i18n.lbl_DepositAmount} :</span>{" "}
								{number_format(real_amount, _isConvert)}
							</div>
						</>
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
									real_amount,
									selBank.bank.id
								)}>
								{i18n["lbl_Submit"]}
							</button>
						</div>
					)
				});
			}
		}
	};

	return redirect ? (
		<Redirect to="/deposit" noThrow />
	) : (
		<>
			<Step step={3} total={2} />
			<div className="inputBox">
				<DropdownIMG
					mainKey={"onlineBanking-bankList"}
					onSelectItem={SelectBank}
					options={bankList}
					selectedIdx={selBank?.idx}
					i18n={i18n}
					ImgURL={`${config.apiURL}/common/images/BankLogo/`}
					className="bankLogo"
				/>
				<LimitTip
					displayTextLimit={i18n.lbl_Limit}
					displayTextUnLimit={i18n.lbl_Unlimited}
					minAmount={selBank?.bank?.minAmount}
					maxAmount={selBank?.bank?.maxAmount}
					_isConvert={_isConvert}
				/>
			</div>
			<InputBox
				icon="icon-pencil"
				value={amount}
				inputType="tel"
				onChange={EditAmount}
				Warning={warning}
			/>
			<div className="btn-group">
				<Link to="../" className="white">
					{i18n.lbl_Back}
				</Link>
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};
