import React, { useContext } from "react";
import {
	i18nContext,
	navContext,
	defPanel,
	userInfoContext
} from "../common/context";
import { Link } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);

	const ShowLogin = () => {
		setNav(defPanel.login);
	};

	const NavLink = props => {
		if (!userInfo.isLogin) {
			let newProps = { ...props, to: "/" };
			return <Link {...newProps} onClick={ShowLogin} />;
		} else {
			return <Link {...props} />;
		}
	};

	return (
		<div className="thBar">
			<NavLink to={path.deposit.root} className="icon icon-deposit">
				<span>{i18n.lbl_Deposit}</span>
			</NavLink>
			<NavLink to={path.transfer.root} className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</NavLink>
			<NavLink to={path.withdrawal.root} className="icon icon-withdrawal">
				<span>{i18n.lbl_Withdrawal}</span>
			</NavLink>
			<NavLink to={path.message.root} className="icon icon-email">
				<span>{i18n.lbl_Message}</span>
			</NavLink>
			{/* <a className="icon icon-vip">
				<span>VIP LV100</span>
			</a> */}
		</div>
	);
};

export default ShortcutBar;
