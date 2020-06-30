import React, { useContext, useRef, useEffect, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext,
	navContext
} from "../common/context";
import { LOGOUT } from "../../service/auth";
import { number_format, isConvert } from "../common/common";
import { api_GetBalnace } from "../../service/api/account";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";
import Webmap from "./webMap";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

	let balance = number_format(
		walletInfo.main,
		isConvert(userInfo.currencyId)
	);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setWalletInfo(prevState => ({
							...prevState,
							main: res.data.data
						}));
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

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

	return (
		<>
			<div className="avatar"></div>
			<div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv{userInfo.userLevel}
			</div>
			<div className="balance">
				{i18n[`Currency_${userInfo.currencyId}`]} {balance}
				<ReloadSpin func={GetBalance} />
			</div>
			<div className="btn-group">
				<button className="orange" onClick={handleLogout}>
					{i18n.lbl_Logout}
				</button>
			</div>
			<ProfileDetail />
			<div className="btn-group">
				<button className="blue">
					<Link to={`/${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword}
					</Link>
				</button>
			</div>
			<Webmap />
		</>
	);
};

export default Panel;
