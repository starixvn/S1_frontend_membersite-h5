import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext
} from "../common/context";
import { number_format, isConvert } from "../common/common";

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
			<div className="tag">
				<button className="open">{i18n.lbl_Profile}</button>
				<button>{i18n.lbl_BankInfo}</button>
			</div>
			<div className="avatar"></div>
			<div className="balance">
				{i18n[`Currency_${userInfo.currencyId}`]} {balance}
			</div>
		</>
	);
};

export default Panel;
