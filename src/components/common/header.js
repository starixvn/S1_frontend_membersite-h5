import React, { useContext, useState, useEffect } from "react";
import logoItem from "../../styles/Nova88/img/logo.svg";
import { LOGOUT } from "../../service/auth";
import { Redirect } from "@reach/router";
import SubMenu from "../subMenu/subMenu";
import { userInfoContext, i18nContext, navContext } from "../common/context";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";

const HeaderTitle = ({ title }) => <div className="title">{title}</div>;

const Header = ({ title, hideLogo }) => {
	return (
		<header className={title ? "header" : ""}>
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
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}
		return () => {
			mounted = false;
		};
	}, [redirectPath, setRedirectPath]);

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			setRedirectPath("/");
		});
	};

	return redirectPath === null ? (
		userInfo?.isLogin ? (
			<div className="headerButton">
				<button onClick={handleLogout}>{i18n.lbl_Logout}</button>
			</div>
		) : (
			<div className="headerButton">
				<JoinPanel />
				<LoginPanel ButtonTitle={i18n.lbl_Login} />
			</div>
		)
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default Header;
