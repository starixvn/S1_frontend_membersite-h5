import { accountStrictRequest } from "./base";

export const GetCustProfile = () =>
	accountStrictRequest.post("/GetCustProfile");
