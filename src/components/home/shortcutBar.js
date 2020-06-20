import React, { useContext, useState, useEffect } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import { api_GetCustBankInfo } from "../../service/api/account";
import { Link, Redirect } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { msgCount } = useContext(msgCountContext);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}
		return () => (mounted = false);
	}, [redirectPath]);

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const ShowUpdProfileHint = () => {
		const ClosePopBox = () => {
			setPopBox({ isOpen: false });
			setRedirectPath(path.member.root);
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_UpdatePersonalInfo,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={ClosePopBox}>
						{i18n.lbl_UpdatePersonalDetail}
					</button>
				</div>
			)
		});
	};

	const ShowUpdBankInfoHint = () => {
		const ClosePopBox = () => {
			setPopBox({ isOpen: false });
			setRedirectPath(
				`${path.member.root}/${path.member.sub.bankInfo.root}`
			);
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_UpdateBankDetail,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={ClosePopBox}>
						{i18n.lbl_UpdatePersonalDetail}
					</button>
				</div>
			)
		});
	};

	const NavLink = props => {
		let { checkProfile, redirectPath, checkBankInfo, ...passProps } = props;
		if (userInfo.isLogin === false) {
			passProps = { ...passProps, to: "/", onClick: ShowLogin };
		} else if (checkProfile) {
			if (
				!userInfo.accountName ||
				!userInfo.birth_d ||
				!userInfo.phoneNo
			) {
				passProps = {
					...passProps,
					to: "/",
					onClick: ShowUpdProfileHint
				};
			}
		}

		return <Link {...passProps} />;
	};

	return redirectPath === null ? (
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
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default ShortcutBar;
