import { siteRequest } from "./base";
import langKeys from "../../datas/langKeys_Home";

export const api_GetTranslationData = (langId, data) =>
	siteRequest.post(
		`/GetTranslationData${langId ? `/${langId}` : ""}`,
		data ? data : langKeys
	);

export const api_ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const api_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email: Email });

export const api_Register = data => siteRequest.post(`/Register/`, data);

export const api_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const api_GetSiteLangList = () => siteRequest.post(`/GetSiteLangList/`);

export const api_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);

export const api_GetGamelist = () => siteRequest.post(`/GetGamelist`);
