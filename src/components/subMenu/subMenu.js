import React, { useContext, useState, useEffect } from "react";
import Profile from "./subMenu.profile";
import {
	navContext,
	defNavPanel,
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import SubGameList from "./subMenu.gameList";
import { Link, Redirect } from "@reach/router";
import path from "../../path";

const SubMenu = () => {
	const { userInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);

	const handleOpen = () => {
		setNav(prevState => {
			let newState =
				prevState === defNavPanel.subMenu ? null : defNavPanel.subMenu;
			return newState;
		});
	};

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}
		return () => (mounted = false);
	}, [redirectPath]);

	let isOpen = nav === defNavPanel.subMenu;

	const ClickMenuItem = (needLogin, isLogin) => {
		let panel = needLogin && !isLogin ? defNavPanel.login : null;
		setNav(panel);
	};

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const ShowUpdProfileHint = redirectPath => {
		const ClosePopBox = _redirectPath => {
			setNav(null);
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
		<>
			<div
				className={`close${isOpen ? " open" : ""}`}
				onClick={handleOpen}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div className={`subMenu${isOpen ? " open" : ""}`}>
				<Profile />
				<div className="subThBar">
					<NavLink
						to={path.deposit.root}
						className="icon icon-deposit"
						checkProfile={true}
						redirectPath={path.member.root}
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						<span>{i18n.lbl_Deposit}</span>
					</NavLink>
					<Link
						to={path.transfer.root}
						className="icon icon-transfer"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						<span>{i18n["lbl_Transfer"]}</span>
					</Link>
					<NavLink
						to={path.withdrawal.root}
						className="icon icon-withdrawal"
						checkProfile={true}
						redirectPath={path.member.root}
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						<span>{i18n.lbl_Withdrawal}</span>
					</NavLink>
				</div>
				<SubGameList />
				<div className="memberFunction">
					<Link
						to={path.member.root}
						className="icon icon-member"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						Member
					</Link>
					<Link
						to={path.statement.root}
						className="icon icon-history"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						Statement
					</Link>
					<Link
						to={path.message.root}
						className="icon icon-email"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						<span>{i18n.lbl_Message}</span>
						{/* <span className="amount">20</span> */}
					</Link>
					<a className="icon icon-vip">
						<span>VIP Lv{userInfo.userLevel}</span>
					</a>
				</div>
			</div>
		</>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default SubMenu;
