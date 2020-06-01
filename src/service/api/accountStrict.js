import { accountStrictRequest } from "./base";

export const api_GetCustProfile = () =>
	accountStrictRequest.post("/GetCustProfile");
