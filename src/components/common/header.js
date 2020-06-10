import React, { useContext } from "react";
import logoItem from "../../styles/Nova88/img/logo.svg";
import { LOGOUT } from "../../service/auth";
import { navigate } from "@reach/router";
import SubMenu from "../subMenu/subMenu";
import { userInfoContext, i18nContext, navContext } from "../common/context";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";

const HeaderTitle = ({ title }) => <div className="title">{title}</div>;

const Header = ({ title, hideLogo }) => {
	return (
		<header>
			{hideLogo ? null : (
				<a href="#">
					<img src={logoItem} alt="logo" />
				</a>
			)}
			{title ? <HeaderTitle title={title} /> : <HeaderBtn />}
			<SubMenu />
		</header>
	);
};

const HeaderBtn = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			navigate("/");
		});
	};

	return userInfo?.isLogin ? (
		<div className="headerButton">
			<button onClick={handleLogout}>{i18n.lbl_Logout}</button>
		</div>
	) : (
		<div className="headerButton">
			<JoinPanel />
			<LoginPanel ButtonTitle={i18n.lbl_Login} />
		</div>
	);
};

export default Header;
