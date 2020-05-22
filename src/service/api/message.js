import { messageRequest } from "./base";

export const GetAnnouncement = langCode =>
	messageRequest.post(`/GetAnnouncement/${langCode}`);
