import { siteRequest } from "./base";
import langKeys from "../../datas/langKeys";

export const api_GetTranslationData = (langId, data) =>
	siteRequest.post(
		`/GetTranslationData${langId ? `/${langId}` : ""}`,
		data ? data : langKeys
	);

export const api_ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const api_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email: Email });

// export const api_Register = data => siteRequest.post(`/Register/`, data);
export const api_Signup = (data, langId) =>
	siteRequest.post(`/Signup/${langId}`, data);

export const api_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const api_GetSiteLangList = () => siteRequest.post(`/GetSiteLangList/`);

export const api_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);

export const api_GetGamelist = () => siteRequest.post(`/GetGamelist`);

export const api_ForgetPwd = ({ langId, Email }) =>
	siteRequest.post(`/ForgetPwdV2/${langId}`, { Email: Email, flag: 2 });

export const api_GetTpIds = () => siteRequest.post(`/GetTpIds`);

export const api_GetBanner = (
	FolderName,
	refId,
	lang,
	filterHideInHome = false
) =>
	siteRequest.post(
		`/GetBanner/${lang}`,
		`FolderName=${FolderName}&refId=${refId}&filterHideInHome=${filterHideInHome}`
	);

export const api_CheckResetPwdToken = key =>
	siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

export const api_WhoAMI = key => siteRequest.post(`/WhoAMI`);

export const api_ExistsPhoneNo = ({ AreaCode, Phone }) =>
	siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });
