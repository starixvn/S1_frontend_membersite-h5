import { paymentRequest } from "./base";

export const api_GetBankInfoSysList = () =>
	paymentRequest.post("/GetBankInfoSysList");

export const api_GetDepositInfoHistory = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetDepositInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetWithdrawalInfoHistory = ({
	StartDate,
	EndDate,
	PageNumber
}) =>
	paymentRequest.post("/GetWithdrawalInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetStatement = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetStatement", {
		StartDate,
		EndDate,
		PageNumber
	});
