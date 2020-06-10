import React, { useContext } from "react";
import Step from "./step";
import { i18nContext } from "../common/context";
import OnlineBanking from "./deposit.onlineBanking";
import LocalBank from "./deposit.localBank";
import MobilePay from "./deposit.mobilePay";
import { Link } from "@reach/router";

const defPayment = {
	onlineBank: {
		icon: "icon icon-connection",
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant",
		pageContent: <OnlineBanking />
	},
	localBank: {
		icon: "icon icon-credit-card",
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins",
		pageContent: <LocalBank />
	},
	mobilePay: {
		icon: "icon icon-mobile",
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins",
		pageContent: <MobilePay />
	}
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);

	const paymentList = Object.keys(defPayment).map(key => {
		let item = defPayment[key];
		return (
			<div key={`deposit-${key}`}>
				<Link to={`${key}`} className={item.icon} />
				<span>{i18n[item.displayKey]}</span>
				<span className="title">{i18n.lbl_CreditTime}</span>
				<span className="creditTime">{i18n[item.creditTimeKey]}</span>
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
