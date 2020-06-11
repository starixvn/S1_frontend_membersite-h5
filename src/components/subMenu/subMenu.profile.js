import React, { useState, useContext, useEffect } from "react";
import {
	userInfoContext,
	i18nContext,
	walletInfoContext
} from "../common/context";
import LangDropdown from "../common/dropdown.icon";
import {
	api_GetSiteLangList,
	api_GetTranslationData
} from "../../service/api/site";
import { GET_LANG_ID } from "../../service/language";
import { api_SetLanguage } from "../../service/api/account";
import { number_format, isConvert } from "../common/common";

const Profile = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n, seti18n } = useContext(i18nContext);

	const [userLanValue, setUserLanValue] = useState(0);

	const [langList, setLangList] = useState([]);

	useEffect(() => {
		api_GetSiteLangList().then(res => {
			const langNum = res.data.data;
			let langArr = langNum.map(id => {
				return {
					langId: id.langId,
					displayText: id.language,
					iconClassName: `flag ${id.langId}`
				};
			});
			setLangList(langArr);
		});
	}, []);

	useEffect(() => {
		let langId = userInfo.langId ?? GET_LANG_ID();
		let idx = langList.findIndex(x => x.langId === langId);
		if (idx !== -1) {
			setUserLanValue(idx);
		}
	}, [langList, userInfo.langId]);

	const selectItemHandler = idx => {
		if (idx !== userLanValue) {
			let langId = langList[idx].langId;
			setUserInfo(prevState => ({
				...prevState,
				langId: langId
			}));

			setUserLanValue(idx);

			if (userInfo.isLogin) {
				api_SetLanguage(langId);
			}
		}
	};

	const { walletInfo } = useContext(walletInfoContext);

	let balance = number_format(
		walletInfo.main,
		isConvert(userInfo.currencyId)
	);
	return (
		<div className="info">
			<div className="Avatar"></div>
			<div className="MemberID">Welcome {userInfo?.userName}</div>
			<Balance
				isLogin={userInfo.isLogin}
				currency={i18n[`Currency_${userInfo.currencyId}`]}
				amount={balance}
			/>
			<button className="icon icon-spinner11 clickBtn"></button>

			<div className="Country">
				<i className="icon icon-sphere"></i>
				<LangDropdown
					options={langList}
					mainKey="lang"
					onSelectItem={selectItemHandler}
					selectedIdx={userLanValue}
				/>
			</div>
		</div>
	);
};

const Balance = ({ isLogin, currency, amount }) => {
	let displayText = isLogin ? `${currency} ${amount}` : "";
	return <div className="Balance">{displayText}</div>;
};

export default Profile;
