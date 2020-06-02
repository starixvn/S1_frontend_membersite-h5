import React, { useContext } from "react";
import logoItem from "../../styles/Nova88/img/logo.svg";
import { LOGOUT } from "../../service/auth";
import { navigate } from "@reach/router";
import { userInfoContext } from "../context/userInfo";
import SubMenu from "../subMenu/subMenu";
import { i18nContext } from "../context/i18n";
import { navContext } from "../context/nav";
import { api_GetTranslationData } from "../../service/api/site";
import { api_SetLanguage } from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";

const HeaderTitle = ({ title }) => <div className="title">{title}</div>;

const Header = ({ title }) => {
	return (
		<header>
			<a href="#">
				<img src={logoItem} alt="logo" />
			</a>
			{title === null ? <HeaderBtn /> : <HeaderTitle title={title} />}
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

const TestBtn = () => {
	const { seti18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const GetLang = langId => {
		if (userInfo?.langId !== langId) {
			if (userInfo?.isLogin) {
				api_SetLanguage(langId).then(res => {
					if (res.data.errorCode === 0) {
						api_GetTranslationData(langId).then(res => {
							seti18n(res.data.data);
							setUserInfo(prevState => ({
								...prevState,
								langId: langId
							}));
						});
					}
				});
			} else {
				api_GetTranslationData(langId).then(res => {
					seti18n(res.data.data);
					setUserInfo(prevState => ({
						...prevState,
						langId: langId
					}));
				});
			}
		}
	};

	return (
		<>
			{/* <button
				onClick={() => {
					document.querySelector("html").setAttribute("class", "");
				}}>
				Light
			</button>
			<button
				onClick={() => {
					document
						.querySelector("html")
						.setAttribute("class", "dark");
				}}>
				Dark
			</button> */}
		</>
	);
};

export default Header;
