import moment from "moment";
import { defPromoStatus } from "./promotion.def";
import { isExpiry } from "./promotion.common";

export default ({ promotionInfo, i18n, isLogin }) => {
	let expiryTime = moment.duration(
		moment
			.unix(
				promotionInfo.isJoin &&
					promotionInfo.status === defPromoStatus.running &&
					promotionInfo.custExpiryTime
					? moment(promotionInfo.custExpiryTime).unix()
					: promotionInfo.periodTo
			)
			.diff(new Date())
	);

	return isExpiry({
		...promotionInfo,
		isLogin: isLogin
	})
		? "-"
		: `${expiryTime.days()} ${i18n.lbl_Days} ${expiryTime.hours()} ${
				i18n.lbl_Hours
		  }`;
};
