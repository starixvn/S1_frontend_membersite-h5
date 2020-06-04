import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext
} from "../common/context";
import { number_format, isConvert } from "../common/common";
import ProfileDetail from "./profile.detail";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { walletInfo } = useContext(walletInfoContext);

	let balance = number_format(
		walletInfo.main,
		isConvert(userInfo.currencyId)
	);
	return (
		<>
			<div className="avatar"></div>
			<div className="balance">
				{i18n[`Currency_${userInfo.currencyId}`]} {balance}
			</div>
			<ProfileDetail />
		</>
	);
};

export default Panel;
