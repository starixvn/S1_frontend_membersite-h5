import { siteRequest } from "./base";
import langKeys from "../../datas/langKeys_Home";

export const GetTranslationData = (langCode, data) =>
	siteRequest.post(
		`/GetTranslationData${langCode ? `/${langCode}` : ""}`,
		data ? data : langKeys
	);

export const ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const Register = ({ UserName, Userpwd, Email, CurrencyId, UserLang }) =>
	siteRequest.post(`/Register/`, {
		UserName,
		Userpwd,
		Email,
		CurrencyId,
		UserLang
	});

export const GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);
