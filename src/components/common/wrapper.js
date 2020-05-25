import React, { useState, useEffect } from "react";
import { i18nContext } from "../context/i18n";
import { userInfoContext } from "../context/userInfo";
import { popBoxContext } from "../context/popBox";
import { GetTranslationData } from "../../service/api/site";
import { isLoggedIn } from "../../service/auth";
import { navigate } from "@reach/router";

export const Wrapper = ({ children, pageLangKeys, afterLogin }) => {
	const [userInfo, setUserInfo] = useState({
		isLogin: isLoggedIn()
	});

	const [i18n, seti18n] = useState({});

	const [popBox, setPopBox] = useState({
		isOpen: false,
		title: "",
		content: ""
	});

	useEffect(() => {
		let mounted = true;
		GetTranslationData().then(
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
		<i18nContext.Provider value={{ i18n, seti18n }}>
			<userInfoContext.Provider value={{ userInfo, setUserInfo }}>
				<popBoxContext.Provider value={{ popBox, setPopBox }}>
					{children}
				</popBoxContext.Provider>
			</userInfoContext.Provider>
		</i18nContext.Provider>
	);
};
