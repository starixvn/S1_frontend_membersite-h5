import React, { useContext, useState, useEffect } from "react";
import {
	i18nContext,
	navContext,
	defPanel,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { Link, Redirect } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}
		return () => (mounted = false);
	}, [redirectPath]);

	const ShowLogin = () => {
		setNav(defPanel.login);
	};

	const ShowUpdProfileHint = redirectPath => {
		const ClosePopBox = _redirectPath => {
			setPopBox({ isOpen: false });
			setRedirectPath(_redirectPath);
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_UpdatePersonalInfo,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="blue"
						onClick={ClosePopBox.bind(this, redirectPath)}>
						{i18n.lbl_UpdatePersonalDetail}
					</button>
				</div>
			)
		});
	};

	const NavLink = props => {
		let { checkProfile, redirectPath, ...passProps } = props;
		if (!userInfo.isLogin) {
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
					onClick: ShowUpdProfileHint.bind(this, redirectPath)
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
				checkProfile={true}
				redirectPath={path.member.root}>
				<span>{i18n.lbl_Deposit}</span>
			</NavLink>
			<NavLink to={path.transfer.root} className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</NavLink>
			<NavLink
				to={path.withdrawal.root}
				className="icon icon-withdrawal"
				checkProfile={true}
				redirectPath={path.member.root}>
				<span>{i18n.lbl_Withdrawal}</span>
			</NavLink>
			<NavLink to={path.message.root} className="icon icon-email">
				<span>{i18n.lbl_Message}</span>
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
