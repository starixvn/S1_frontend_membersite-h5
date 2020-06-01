import { messageRequest } from "./base";

export const api_GetAnnouncement = langCode =>
	messageRequest.post(`/GetAnnouncement/${langCode}`);
