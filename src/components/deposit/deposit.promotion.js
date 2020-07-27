import React, { useEffect, useContext, useState } from "react";
import Dropdown from "../common/dropdown";
import { i18nContext } from "../common/context";
import { api_promotion_GetCanJoinPromotionList } from "../../service/api/promotion";

export default () => {
	const { i18n } = useContext(i18nContext);
	const [selPromoIdx, setSelPromoIdx] = useState(null);
	const [promoList, setPromoList] = useState(null);

	useEffect(() => {
		let mounted = true;
		api_promotion_GetCanJoinPromotionList().then(
			res => {
				if (mounted) {
					if (res.data.errcode === 0) {
						setPromoList(res.data.data);
					}
				}
			},
			err => {
				if (mounted) {
				}
			}
		);

		return (mounted = false);
	}, []);

	const OnSelect = idx => {
		if (selPromoIdx !== idx) {
			setSelPromoIdx(idx);
		}
	};

	return promoList === null ? (
		<></>
	) : (
		<>
			<div className="inputBox">
				<Dropdown
					mainKey="localBank-promoList"
					i18n={i18n}
					options={promoList}
					selectedIdx={selPromoIdx}
					onSelectItem={OnSelect}
					placeholder={""}
				/>
				<div className="tip">
					<a>More Info</a>
				</div>
			</div>
			{selPromoIdx === null ? null : (
				<div className="text-white-border-org">
					<span>Your bonus will transfer to </span>
					<span>{promoList[selPromoIdx].bonusWallet}</span>
				</div>
			)}
		</>
	);
};
