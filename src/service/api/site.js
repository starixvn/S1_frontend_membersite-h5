import { siteRequest } from "./base";
import langKeys from "../../datas/langKeys_Home";

export const GetTranslationData = (langCode, data) =>
	siteRequest.post(
		`/GetTranslationData${langCode ? `/${langCode}` : ""}`,
		data ? data : langKeys
	);

export const ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email: Email });

export const Register = data => siteRequest.post(`/Register/`, data);

export const GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const GetSiteLangList = () => siteRequest.post(`/GetSiteLangList/`);
