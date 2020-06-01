import React, { useState, useContext, useEffect } from "react";
import { userInfoContext } from "../context/userInfo";
import LangDropdown from "./dropdown.icon";
import { api_GetSiteLangList } from "../../service/api/site";
import { GetLangId } from "../../service/language";
import { api_SetLanguage } from "../../service/api/account";
import { api_GetTranslationData } from "../../service/api/site";
import { i18nContext } from "../context/i18n";

const Profile = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { seti18n } = useContext(i18nContext);

	if (userInfo && !userInfo.isLogin) {
		userInfo["username"] = "guest";
	}

	const [userLanValue, setUserLanValue] = useState(0);

	const [langList, setLangList] = useState([]);

	useEffect(() => {
		api_GetSiteLangList().then(res => {
			const langNum = res.data.data;
			let langArr = langNum.map(id => {
				return {
					langId: id.langId,
					language: id.language,
					iconClassName: `flag ${id.langId}`
				};
			});
			setLangList(langArr);
		});
	}, []);

	useEffect(() => {
		let langCode = userInfo.langCode ?? GetLangId();
		let idx = langList.findIndex(x => x.langId === langCode);
		if (idx !== -1) {
			setUserLanValue(idx);
		}
	}, [langList, userInfo.langCode]);

	const selectItemHandler = idx => {
		if (idx !== userLanValue) {
			let langId = langList[idx].langId;
			setUserInfo(prevState => ({
				...prevState,
				langCode: langId
			}));

			setUserLanValue(idx);

			if (userInfo.isLogin) {
				api_SetLanguage(langId).then(res => {
					api_GetTranslationData(langId).then(res => {
						let data = res.data.data;
						seti18n(data);
					});
				});
			} else {
				api_GetTranslationData(langId).then(res => {
					let data = res.data.data;
					seti18n(data);
				});
			}
		}
	};

	return (
		<div className="info">
			<div className="Avatar"></div>
			<div className="MemberID">Welcome {userInfo?.username}</div>
			<Balance isLogin={userInfo.isLogin} />
			<div className="Country">
				<i className="icon icon-sphere"></i>
				<LangDropdown
					options={langList}
					mainKey="lang"
					userValue={userLanValue}
					onSelectItem={selectItemHandler}
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
