import React, { useContext, useEffect, useState, useRef } from "react";
import {
	userInfoContext,
	popBoxContext,
	i18nContext
} from "../components/common/context";
import { getUrlParameter, number_format } from "../components/common/common";
import {
	api_promotion_GetPromotionDetail,
	api_promotion_SetClaimPromotion
} from "../service/api/promotion";
import { api_account_GetCustSpecificBonus } from "../service/api/account";
import moment from "moment";
import { Link, Redirect } from "@reach/router";
import path from "../path";
import ReloadSpin from "../components/common/reloadSpin";
import { isExpiry } from "../components/common/promotion.common";

const promoStatus = {
	running: 1,
	Canceled: 2,
	Expiry: 3,
	TransferOut: 5
};

const defPromotionType = {
	firstDeposit: 1,
	reDeposit: 2,
	freeBet: 3,
	walletBonus: 5,
	rebate: 6,
	cashback: 7
};

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [promotionInfo, setPromotionInfo] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (userInfo.isLogin !== null) {
			let _bonusCode = getUrlParameter("bonusCode");

			api_promotion_GetPromotionDetail({
				langId: userInfo.langId,
				BonusCode: _bonusCode
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPromotionInfo(res.data.data);
						} else {
							alert(res.data.message);
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						alert(i18n.msg_ApiServerError);
					}
				}
			);
		}
	}, [userInfo.isLogin, userInfo.langId, i18n.msg_ApiServerError]);

	const GetPromotionDetail = (langId, _bonusCode) => {
		api_promotion_GetPromotionDetail({
			langId: langId,
			BonusCode: _bonusCode
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setPromotionInfo(res.data.data);
					} else {
						alert(res.data.message);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					alert(i18n.msg_ApiServerError);
				}
			}
		);
	};

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
								GetPromotionDetail(
									userInfo.langId,
									_promo.bonusCode
								);

								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: (
										<>
											<p>{i18n.msg_Updatesuccessful}</p>
										</>
									),
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
										<>
											<p>
												{res.data.message
													? res.data.message
													: `[${res.data.errorCode}] Something went wrong...`}
											</p>
										</>
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

	const RefreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			PromoCategoryId: categoryId
		}).then(
			res => {
				if (
					isMountedRef.current &&
					res.data.errorCode === 0 &&
					res.data.data
				) {
					setPromotionInfo(prevS => ({
						...prevS,
						custRollOver: res.data.data.rollover,
						custTurnOver: res.data.data.turnover
					}));
				}
			},
			err => {}
		);
	};

	if (promotionInfo === null) return null;

	let _isExpiry = false;

	if (promotionInfo !== null) {
		_isExpiry = isExpiry({
			...promotionInfo,
			isLogin: userInfo.isLogin
		});
	}

	let expiryTime = moment.duration(
		moment
			.unix(
				promotionInfo.isJoin &&
					promotionInfo.status === promoStatus.running &&
					promotionInfo.custExpiryTime
					? moment(promotionInfo.custExpiryTime).unix()
					: promotionInfo.periodTo
			)
			.diff(new Date())
	);

	let displayExpiryTime =
		expiryTime.days() +
		" " +
		i18n.lbl_Days +
		" " +
		expiryTime.hours() +
		" " +
		i18n.lbl_Hours;

	return redirectPath === null ? (
		<div className="promodule">
			<img src={promotionInfo.banner} alt={promotionInfo.title} />
			<Link className="btn-cancel" to={`/${path.promotion.root}`}>
				{i18n.lbl_Back}
			</Link>

			{userInfo.isLogin === false ? (
				<Link className="btn-check" to={`/${path.login.root}`}>
					{i18n.lbl_PromoJoinNow}
				</Link>
			) : userInfo.isLogin && !promotionInfo.isJoin && !_isExpiry ? (
				<button
					className="btn-check"
					onClick={onJoinPromotion.bind(this, promotionInfo)}>
					{i18n.lbl_PromoJoinNow}
				</button>
			) : null}

			<div className="protitle">{promotionInfo.title}</div>
			<div className="text">{promotionInfo.description}</div>

			<DepositRecord
				i18n={i18n}
				{...promotionInfo}
				currencyId={userInfo.currencyId}
			/>

			{promotionInfo.isJoin ? (
				<ProcessBar
					i18n={i18n}
					currencyId={userInfo.currencyId}
					{...promotionInfo}
					RefreshProcessBar={RefreshProcessBar.bind(
						this,
						promotionInfo
					)}
				/>
			) : null}

			<div className="info">
				<ul>
					<li>
						<span className="title">
							{i18n.lbl_RollOver?.toUpperCase()}
						</span>
						<span>{promotionInfo.rollOver}x</span>
					</li>
					<li>
						<span className="title">
							{i18n.lbl_RemainingTime?.toUpperCase()}
						</span>
						<span>{displayExpiryTime}</span>
					</li>
					{promotionInfo.requiredAmount > 0 ? (
						<li>
							<span className="title">
								{i18n.lbl_MinAmount?.toUpperCase()}
							</span>
							<span>
								{number_format(promotionInfo.requiredAmount)}
							</span>
						</li>
					) : null}
				</ul>
			</div>
			<div
				className="text"
				dangerouslySetInnerHTML={{
					__html: `<pre>${promotionInfo.details}</pre>`
				}}></div>
		</div>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

const DepositRecord = ({
	i18n,
	depositId,
	depositAmount,
	canJoin,
	isJoin,
	currencyId,
	promotionType
}) => {
	return canJoin &&
		!isJoin &&
		(promotionType === defPromotionType.reDeposit ||
			promotionType === defPromotionType.firstDeposit) ? (
		<div className="minAmount">
			<div>
				<div>{i18n.lbl_ID}</div>
				<div>{depositId}</div>
			</div>
			<div>
				<div>{i18n.lbl_DepositAmount}</div>
				<div>{`${i18n[`Currency_${currencyId}`]} ${number_format(
					depositAmount,
					false
				)}`}</div>
			</div>
		</div>
	) : (
		<></>
	);
};

const ProcessBar = ({
	i18n,
	currencyId,
	custTurnOver,
	custRollOver,
	RefreshProcessBar
}) => {
	let percentage =
		custTurnOver > custRollOver
			? 100
			: ((custTurnOver / custRollOver) * 100).toFixed(2);
	return (
		<div className="progressBarModule">
			<div className="bounsName">{i18n.lbl_TurnoverAccumulated}</div>
			<div className="turnover">
				<span>
					{i18n[`Currency_${currencyId}`]}{" "}
					{number_format(custTurnOver, false)}
				</span>{" "}
				/ ({i18n.lbl_Req} {i18n[`Currency_${currencyId}`]}{" "}
				{number_format(custRollOver, false)})
				<ReloadSpin func={RefreshProcessBar} />
			</div>
			<div className="progressBar">
				<div className="bar">
					<div
						className="progress"
						style={{ width: `${percentage}%` }}></div>
				</div>
				<div className="percentage">{percentage}%</div>
			</div>
		</div>
	);
};
