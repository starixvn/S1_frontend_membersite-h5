import { siteRequest } from "./base";
import langKeys from "../../datas/langKeys_Home";

export const GetTranslationData = (langCode, data) =>
	siteRequest.post(
		`/GetTranslationData${langCode ? `/${langCode}` : ""}`,
		data ? data : langKeys
	);

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
