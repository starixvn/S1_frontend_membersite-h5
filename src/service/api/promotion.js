import { promotionRequest } from "./base";

export const api_promotion_GetCanJoinPromotionList = () =>
	promotionRequest.post("/GetCanJoinPromotionList");
