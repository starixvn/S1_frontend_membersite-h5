import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, Redirect } from "@reach/router";
import path from "../../path";
import { userInfoContext, popBoxContext, i18nContext } from "../common/context";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import { isExpiry } from "./promotion.common";

export default ({ promotionInfo, func_GetPromotionDetail, func_CallBack }) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const onJoinPromotion = _promo => {
		if (userInfo.isLogin !== false) {
			const ClosePopBox = () => {
				setPopBox({
					isOpen: false
				});
			};

			if (
				userInfo.currencyId &&
				!userInfo.accountName &&
				!userInfo.phoneNo &&
				!userInfo.email
			) {
				const RedirectToProfile = () => {
					setRedirectPath(
						`/${path.member.root}?prevPage=${path.promotionInfo.root}&BonusCode=${_promo.bonusCode}`
					);
					ClosePopBox();
				};
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: <p>{i18n.lbl_UpdatePersonalInfoPromotion}</p>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Cancel}
							</button>
							<button
								onClick={RedirectToProfile}
								className="btn-check">
								{i18n.lbl_GoNow}
							</button>
						</div>
					)
				});
			} else if (
				_promo.canJoin &&
				!_promo.isJoin &&
				_promo.result === 1 &&
				_promo.requiredAmount > 0
			) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<>
							<div className="info">
								{i18n.lbl_RequireMinAmountHint}
								<span className="text-org">
									{` ${
										i18n[`Currency_${userInfo.currencyId}`]
									} ${_promo.requiredAmount}`}
								</span>
								<br />
								{i18n.msg_GoToDepositPage}
							</div>
						</>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Later}
							</button>
							<Link
								to={`/${path.deposit.root}`}
								className="btn-check">
								{i18n.lbl_DepositNow}
							</Link>
						</div>
					)
				});
			} else {
				api_promotion_SetClaimPromotion({
					langId: userInfo.langId,
					BonusCode: _promo.bonusCode
				}).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								if (func_GetPromotionDetail) {
									func_GetPromotionDetail(
										userInfo.langId,
										_promo.bonusCode
									);
								} else if (func_CallBack) {
									func_CallBack();
								}

								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: <p>{i18n.msg_Updatesuccessful}</p>,
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												onClick={ClosePopBox}
												className="btn-check">
												OK
											</button>
										</div>
									)
								});
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: (
										<p>
											{res.data.message
												? res.data.message
												: `[${res.data.errorCode}] ${i18n.msg_ApiServerError}`}
										</p>
									),
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												onClick={ClosePopBox}
												className="btn-check">
												{i18n.lbl_Close}
											</button>
										</div>
									)
								});
							}
						}
					},
					err => {
						alert(i18n.msg_ApiServerError);
					}
				);
			}
		}
	};

	let _isExpiry = isExpiry({
		...promotionInfo,
		isLogin: userInfo.isLogin
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : userInfo.isLogin === false ? (
		<Link className="btn-check" to={`/${path.login.root}`}>
			{i18n.lbl_PromoJoinNow}
		</Link>
	) : userInfo.isLogin && !promotionInfo.isJoin && !_isExpiry ? (
		<button
			className="btn-check"
			onClick={onJoinPromotion.bind(this, promotionInfo)}>
			{i18n.lbl_PromoJoinNow}
		</button>
	) : (
		<></>
	);
};
