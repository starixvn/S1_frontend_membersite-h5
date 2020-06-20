import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext
} from "../common/context";
import { number_format, isConvert } from "../common/common";
import { api_GetBalnace } from "../../service/api/account";
import ProfileDetail from "./profile.detail";
import ReloadSpin from "../common/reloadSpin";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);

	let balance = number_format(
		walletInfo.main,
		isConvert(userInfo.currencyId)
	);

	const GetBalance = () => {
		api_GetBalnace().then(
			res => {
				if (res.data.errorCode === 0) {
					setWalletInfo(prevState => ({
						...prevState,
						main: res.data.data
					}));
				}
			},
			err => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: "API Server Error."
				});
			}
		);
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
			<ProfileDetail />
		</>
	);
};

export default Panel;
