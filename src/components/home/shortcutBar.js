import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { Link } from "@reach/router";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="thBar">
			<Link to="/deposit" className="icon icon-deposit">
				<span>{i18n.lbl_Deposit}</span>
			</Link>
			<a className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</a>
			<a className="icon icon-withdrawal">
				<span>{i18n.lbl_Withdrawal}</span>
			</a>
			<a className="icon icon-email">
				<span>{i18n.lbl_Email}</span>
			</a>
			{/* <a className="icon icon-vip">
				<span>VIP LV100</span>
			</a> */}
		</div>
	);
};

export default ShortcutBar;
