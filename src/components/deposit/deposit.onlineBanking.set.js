import React, { useEffect, useState, useContext } from "react";
import Step from "./step";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { Link, Redirect } from "@reach/router";
import {
	api_GetOnlineBankInfoSysList,
	api_GetOnlineBankInfo
} from "../../service/api/payment";
import DropdownIMG from "../common/dropdown.image";
import config from "../../config";
import { number_format, isConvert, checkAmount } from "../common/common";
import InputBox from "../common/inputbox";

const SetPayment = props => {
	const [redirect, setRedirect] = useState(false);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [bankList, setBankList] = useState([]);
	const [selBank, setSelBank] = useState({
		idx: null,
		bank: null
	});
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const _isConvert = isConvert(userInfo.currencyId);

	useEffect(() => {
		let mounted = true;
		api_GetOnlineBankInfoSysList({
			payId: props.location.state.payId
		}).then(res => {
			if (res.data.errorCode === 0) {
				let datas = res.data.data.map(b => {
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
				}
			}
		});
		return () => {
			mounted = false;
		};
	}, [props.location.state.payId]);

	const SelectBank = idx => {
		api_GetOnlineBankInfo({
			payId: props.location.state.payId,
			sysId: bankList[idx].id
		}).then(res => {
			if (res.data.errorCode === 0) {
				setSelBank({
					idx: idx,
					bank: res.data.data
				});
			}
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
		let result = checkAmount(
			amount,
			selBank.bank.minAmount,
			selBank.bank.maxAmount,
			_isConvert,
			i18n
		);

		if (result.status === 0) {
			const RedirectToPayment = () => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				setRedirect(true);
				window.open(
					`${config.apiURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking` +
						"?sysId=" +
						selBank.bank.sysId +
						"&payId=" +
						selBank.bank.payId +
						"&ChannelId=" +
						selBank.bank.channelId +
						"&Amount=" +
						amount
				);
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${config.apiURL}/common/images/BankLogo/${selBank.bank.bankLogo}`}
							alt={selBank.bank.bankName}
						/>
						<div className="tip">
							<span>{i18n.lbl_DepositAmount} :</span>{" "}
							{number_format(amount, _isConvert)}
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
						<button className="orange" onClick={RedirectToPayment}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	return redirect ? (
		<Redirect to="/deposit" noThrow />
	) : (
		<>
			<Step step={3} />
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
					isConvert={_isConvert}
					minAmount={selBank?.bank?.minAmount}
					maxAmount={selBank?.bank?.maxAmount}
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

const LimitTip = ({
	minAmount,
	maxAmount,
	displayTextLimit,
	displayTextUnLimit,
	_isConvert
}) => {
	return !minAmount && !maxAmount ? (
		<div className="tip">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{displayTextUnLimit}
		</div>
	) : (
		<div className="tip">
			<span className="text-org">{displayTextLimit} :</span>{" "}
			{`${number_format(minAmount, _isConvert)} ~ ${number_format(
				maxAmount,
				_isConvert
			)}`}
		</div>
	);
};

export default SetPayment;
