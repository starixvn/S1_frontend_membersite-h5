import React, { useState, useEffect } from "react";
import * as ct from "../common/context";
import { api_GetTranslationData } from "../../service/api/site";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import { api_GetBalnace } from "../../service/api/account";
import { IS_LOGGED_IN, ONLINE_CHECK } from "../../service/auth";
import { navigate } from "@reach/router";
import { GET_LANG_ID } from "../../service/language";
import themeList from "../../datas/theme";

export const Wrapper = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		isLogin: IS_LOGGED_IN(),
		langId: GET_LANG_ID(),
		userName: "guest"
	});

	const [i18n, seti18n] = useState({});

	const [popBox, setPopBox] = useState({
		isOpen: false,
		title: "",
		content: "",
		hasBtn: false,
		btnBar: null
	});

	const [nav, setNav] = useState(null);
	const [walletInfo, setWalletInfo] = useState({
		main: 0
	});

	const [theme, setTheme] = useState(themeList.default);

	useEffect(() => {
		if (userInfo.isLogin) {
			const OnlineCheckCallBack = (errorCode, errMsg) => {
				if (errorCode !== 0) {
					setUserInfo(prevState => ({
						...prevState,
						isLogin: false
					}));
					setPopBox({
						isOpen: true,
						title: "Warning",
						content: errMsg
					});
					navigate("/");
				}
			};
			ONLINE_CHECK(OnlineCheckCallBack);
			if (!userInfo.regTime) {
				api_GetCustProfile().then(res_custInfo => {
					if (res_custInfo.data.errorCode === 0) {
						let data = res_custInfo.data.data;
						setUserInfo(prevState => ({
							...prevState,
							...data
						}));
					}
				});
			}

			api_GetBalnace().then(res => {
				if (res.data.errorCode === 0) {
					setWalletInfo(prevState => ({
						...prevState,
						main: res.data.data
					}));
				}
			});
		}
	}, [userInfo.isLogin, userInfo.regTime]);

	useEffect(() => {
		let mounted = true;
		api_GetTranslationData().then(
			res => {
				if (mounted) {
					seti18n(() => res.data.data);
				}
			},
			err => {
				if (err.response) {
					console.log("error status", err.response.status);
				} else {
					console.log("error", err);
				}
			}
		);

		return () => (mounted = false);
	}, []);

	return (
		<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<ct.i18nContext.Provider value={{ i18n, seti18n }}>
				<ct.walletInfoContext.Provider
					value={{ walletInfo, setWalletInfo }}>
					<ct.themeContext.Provider value={{ theme, setTheme }}>
						<ct.popBoxContext.Provider
							value={{ popBox, setPopBox }}>
							<ct.navContext.Provider value={{ nav, setNav }}>
								{children}
							</ct.navContext.Provider>
						</ct.popBoxContext.Provider>
					</ct.themeContext.Provider>
				</ct.walletInfoContext.Provider>
			</ct.i18nContext.Provider>
		</ct.userInfoContext.Provider>
	);
};
