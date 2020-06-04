import { loginRequest } from "./base";
import { accountRequest } from "./base";

export const api_SetLanguage = lang =>
	accountRequest.post("/SetLanguage", { LangId: lang });

export const api_UserLogout = () => accountRequest.post("/SignOut");

export const api_UserLogin = data => loginRequest.post("/SignIn", data);

export const api_onlineCheck = () => accountRequest.post("/onlineCheck");

export const api_GetBalnace = () => accountRequest.post("/GetBalance");
