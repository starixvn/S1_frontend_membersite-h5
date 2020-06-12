import { tpRequest } from "./base";

export const api_GetTransferHistory = ({ StartDate, EndDate, PageNumber }) =>
	tpRequest.post("/GetTransferHistory", {
		StartDate,
		EndDate,
		PageNumber
	});
