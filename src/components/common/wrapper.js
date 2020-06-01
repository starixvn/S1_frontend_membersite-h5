import React, { useState, useEffect } from "react";
import { i18nContext } from "../context/i18n";
import { userInfoContext } from "../context/userInfo";
import { popBoxContext } from "../context/popBox";
import { navContext } from "../context/nav";
import { api_GetTranslationData } from "../../service/api/site";
import { isLoggedIn } from "../../service/auth";
import { OnlineCheck } from "../../service/auth";
import { navigate } from "@reach/router";

export const Wrapper = ({ children }) => {
	const [userInfo, setUserInfo] = useState({
		isLogin: isLoggedIn()
	});

	const [i18n, seti18n] = useState({});

	const [popBox, setPopBox] = useState({
		isOpen: false,
		title: "",
		content: ""
	});

	const [nav, setNav] = useState(null);

	useEffect(() => {
		if (userInfo.isLogin) {
			const OnlineCheckCallBack = (errorCode, errMsg) => {
				if (errorCode !== 0) {
					setUserInfo(prevState => ({
						...prevState,
						isLogin: false
					}));
					if (errorCode !== 401) {
						alert(errMsg);
					}
					navigate("/");
				} else {
					setTimeout();
				}
			};
			OnlineCheck(OnlineCheckCallBack);
		}
	});

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
		<userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<i18nContext.Provider value={{ i18n, seti18n }}>
				<popBoxContext.Provider value={{ popBox, setPopBox }}>
					<navContext.Provider value={{ nav, setNav }}>
						{children}
					</navContext.Provider>
				</popBoxContext.Provider>
			</i18nContext.Provider>
		</userInfoContext.Provider>
	);
};
