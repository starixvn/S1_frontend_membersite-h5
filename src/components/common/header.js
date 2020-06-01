import React, { useContext } from "react";
import logoItem from "../../styles/Nova88/img/logo.svg";
import { logout } from "../../service/auth";
import { navigate } from "@reach/router";
import { Geti18n } from "../../service/language";
import { userInfoContext } from "../context/userInfo";
import SubMenu from "./subMenu";
import { i18nContext } from "../context/i18n";
import { api_GetTranslationData } from "../../service/api/site";
import { api_SetLanguage } from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";

const Header = () => (
	<header>
		<a href="#">
			<img src={logoItem} alt="logo" />
		</a>
		<HeaderBtn />
		<SubMenu />
	</header>
);

const HeaderBtn = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const handleLogout = () => {
		logout(() => {
			setUserInfo(() => ({ isLogin: false }));
			navigate("/");
		});
	};

	return userInfo?.isLogin ? (
		<div className="headerButton">
			<button onClick={handleLogout}>{Geti18n("lbl_Logout")}</button>
		</div>
	) : (
		<div className="headerButton">
			<JoinPanel />
			<LoginPanel ButtonTitle={Geti18n("lbl_Login")} />
		</div>
	);
};

const TestBtn = () => {
	const { seti18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const GetLang = langCode => {
		if (userInfo?.langCode !== langCode) {
			if (userInfo?.isLogin) {
				api_SetLanguage(langCode).then(res => {
					if (res.data.errorCode === 0) {
						api_GetTranslationData(langCode).then(res => {
							seti18n(res.data.data);
							setUserInfo(prevState => ({
								...prevState,
								langCode: langCode
							}));
						});
					}
				});
			} else {
				api_GetTranslationData(langCode).then(res => {
					seti18n(res.data.data);
					setUserInfo(prevState => ({
						...prevState,
						langCode: langCode
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
