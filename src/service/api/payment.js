import { paymentRequest } from "./base";

export const api_GetBankInfoSysList = () =>
	paymentRequest.post("/GetBankInfoSysList");

export const api_GetDepositInfoHistory = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetDepositInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetOnlinePaymentList = () =>
	paymentRequest.post("/GetOnlinePaymentList");

export const api_GetOnlineBankInfoSysList = ({ payId }) =>
	paymentRequest.post("/GetOnlineBankInfoSysList", { payId });

export const api_GetOnlineBankInfo = ({ payId, sysId }) =>
	paymentRequest.post("/GetOnlineBankInfo", { payId, sysId });
