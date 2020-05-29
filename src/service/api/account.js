import { loginRequest } from "./base";
import { accountRequest } from "./base";

export const SetLanguage = lang =>
	accountRequest.post("/SetLanguage", { LangId: lang });

export const UserLogout = () => accountRequest.post("/SignOut");

export const UserLogin = data => loginRequest.post("/SignIn", data);
