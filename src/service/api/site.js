import { siteRequest } from "./base";

export const GetTranslationData = (data, langCode) =>
	siteRequest.post(
		`/GetTranslationData${langCode ? `/${langCode}` : ""}`,
		data
	);
