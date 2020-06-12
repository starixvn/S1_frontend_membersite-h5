import React, { useContext, useEffect, useState } from "react";
import Step from "./step";
import { i18nContext } from "../common/context";
import { Link } from "@reach/router";
import {
	api_GetOnlinePaymentList,
	api_GetBankInfoOffList,
	api_GetMobilePayGroupList
} from "../../service/api/payment";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay"
};

const defPayment = {
	[defPayType.onlineBank]: {
		icon: "icon icon-connection",
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.localBank]: {
		icon: "icon icon-credit-card",
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.mobilePay]: {
		icon: "icon icon-mobile",
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins"
	}
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const [allowPayment, setAllowPayment] = useState({
		[defPayType.onlineBank]: false,
		[defPayType.localBank]: false,
		[defPayType.mobilePay]: false
	});

	const [onlineBankingList, setOnlineBankingList] = useState([]);
	const [localBankList, setLocalBankList] = useState([]);
	const [mobilePayList, setMobilePayList] = useState([]);
	useEffect(() => {
		let mounted = true;
		api_GetOnlinePaymentList().then(res => {
			if (res.data.errorCode === 0) {
				if (mounted) {
					setOnlineBankingList(res.data.data);
					setAllowPayment(prevState => ({
						...prevState,
						[defPayType.onlineBank]: true
					}));
				}
			}
		});

		api_GetBankInfoOffList().then(res => {
			if (res.data.errorCode === 0) {
				if (mounted) {
					setLocalBankList(res.data.data);
					setAllowPayment(prevState => ({
						...prevState,
						[defPayType.localBank]: true
					}));
				}
			}
		});

		api_GetMobilePayGroupList().then(res => {
			if (res.data.errorCode === 0) {
				if (mounted) {
					setMobilePayList(res.data.data);
					setAllowPayment(prevState => ({
						...prevState,
						[defPayType.mobilePay]: true
					}));
				}
			}
		});

		return () => {
			mounted = false;
		};
	}, []);

	const paymentList = Object.keys(defPayment)
		.filter(key => {
			return allowPayment[key];
		})
		.map(key => {
			let item = defPayment[key];
			let list = [];
			if (key === defPayType.onlineBank) {
				list = onlineBankingList;
			} else if (key === defPayType.localBank) {
				list = localBankList;
			} else if (key === defPayType.mobilePay) {
				list = mobilePayList;
			}
			return (
				<div key={`deposit-${key}`}>
					<Link
						to={key}
						className={item.icon}
						state={{
							paymentList: list
						}}
					/>
					<span>{i18n[item.displayKey]}</span>
					<span className="title">{i18n.lbl_CreditTime}</span>
					<span className="creditTime">
						{i18n[item.creditTimeKey]}
					</span>
				</div>
			);
		});

	return (
		<>
			<Step step={1} />
			<div className="depositType">{paymentList}</div>
		</>
	);
};

export default Panel;
