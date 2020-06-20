import React, { useContext } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext,
	msgCountContext
} from "../common/context";
import { Link } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const NavLink = props => {
		let { checkProfile, redirectPath, checkBankInfo, ...passProps } = props;
		if (userInfo.isLogin === false) {
			passProps = { ...passProps, to: "/", onClick: ShowLogin };
		}

		return <Link {...passProps} />;
	};

	return (
		<div className="thBar">
			<NavLink
				to={path.deposit.root}
				className="icon icon-deposit"
				checkProfile={true}>
				<span>{i18n.lbl_Deposit}</span>
			</NavLink>
			<NavLink to={path.transfer.root} className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</NavLink>
			<NavLink
				to={path.withdrawal.root}
				className="icon icon-withdrawal"
				checkProfile={true}>
				<span>{i18n.lbl_Withdrawal}</span>
			</NavLink>
			<NavLink to={path.message.root} className="icon icon-email">
				<span>{i18n.lbl_Message}</span>
				{msgCount ? <span className="amount">{msgCount}</span> : null}
			</NavLink>
			{/* <a className="icon icon-vip">
				<span>VIP LV100</span>
			</a> */}
		</div>
	);
};

export default ShortcutBar;
