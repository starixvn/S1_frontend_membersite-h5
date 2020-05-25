import { siteRequest } from "./base";

export const GetTranslationData = (data, langCode) =>
	siteRequest.post(
		`/GetTranslationData${langCode ? `/${langCode}` : ""}`,
		data
	);

export const ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });
