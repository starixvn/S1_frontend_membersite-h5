import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { Link } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="thBar">
			<Link to={path.deposit.root} className="icon icon-deposit">
				<span>{i18n.lbl_Deposit}</span>
			</Link>
			<Link to={path.transfer.root} className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</Link>
			<Link to={path.withdrawal.root} className="icon icon-withdrawal">
				<span>{i18n.lbl_Withdrawal}</span>
			</Link>
			<Link to={path.message.root} className="icon icon-email">
				<span>{i18n.lbl_Message}</span>
			</Link>
			{/* <a className="icon icon-vip">
				<span>VIP LV100</span>
			</a> */}
		</div>
	);
};

export default ShortcutBar;
