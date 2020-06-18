import React, { useContext } from "react";
import Profile from "./subMenu.profile";
import {
	navContext,
	defPanel,
	i18nContext,
	userInfoContext
} from "../common/context";
import SubGameList from "./subMenu.gameList";
import { Link } from "@reach/router";
import path from "../../path";

const SubMenu = () => {
	const { userInfo } = useContext(userInfoContext);
	const { nav, setNav } = useContext(navContext);
	const { i18n } = useContext(i18nContext);

	const handleOpen = () => {
		setNav(prevState => {
			let newState =
				prevState === defPanel.subMenu ? null : defPanel.subMenu;
			return newState;
		});
	};

	let isOpen = nav === defPanel.subMenu;

	const ClickMenuItem = (needLogin, isLogin) => {
		let panel = needLogin && !isLogin ? defPanel.login : null;
		setNav(panel);
	};

	return (
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
					<Link
						to={path.deposit.root}
						className="icon icon-deposit"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						{i18n["lbl_Deposit"]}
					</Link>
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
					<Link
						to={path.withdrawal.root}
						className="icon icon-withdrawal"
						onClick={ClickMenuItem.bind(
							this,
							true,
							userInfo.isLogin
						)}>
						<span>{i18n["lbl_Withdrawal"]}</span>
					</Link>
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
					</Link>
					<a className="icon icon-vip">
						<span>VIP Lv{userInfo.userLevel}</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default SubMenu;
