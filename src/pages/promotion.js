import React, {
	useEffect,
	useState,
	useContext,
	useCallback,
	useRef
} from "react";
import { userInfoContext, i18nContext } from "../components/common/context";
import config, { siteInfo } from "../config";
import { api_promotion_GetPromotionListV2 } from "../service/api/promotion";
import path from "../path";
import { Link } from "@reach/router";
import StaticPromotionList from "../datas/promotionList";
import JoinBtn from "../components/promotion/promotion.joinBtn";
import RemainTime from "../components/promotion/promotion.remainTime";
import {
	defFilterType,
	defPromotionType,
	defPromotionNav
} from "../components/promotion/promotion.def";
import {
	isExpiry,
	isClaimed,
	isNew
} from "../components/promotion/promotion.common";

const defTabs = {
	Processing: {
		key: "Processing",
		displayKey: "lbl_Processing"
	},
	Expried: {
		key: "Expried",
		displayKey: "lbl_Expired"
	}
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [promotion, setPromotion] = useState([]);
	const [tab, setTab] = useState(defTabs.Processing.key);
	const [filterType, setFilterType] = useState(defFilterType.all);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const getPromotionListV2 = useCallback(() => {
		api_promotion_GetPromotionListV2({ langId: userInfo.langId }).then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					let result = res.data.data.sort((a, b) => {
						return a.periodFrom > b.periodFrom ? -1 : 1;
					});

					setPromotion(result);
				}
			}
		);
	}, [userInfo.langId]);

	useEffect(() => {
		getPromotionListV2();
	}, [getPromotionListV2]);

	const onClickTab = tabKey => {
		setTab(tabKey);
	};

	const onClickFilter = value => {
		setFilterType(value);
	};

	let rows = promotion
		?.filter(p => {
			if (tab === defTabs.Processing.key) {
				if (filterType === defFilterType.all) {
					return !isExpiry({ ...p, isLogin: userInfo.isLogin });
				} else if (filterType === defFilterType.firstDeposit) {
					return (
						(p.promotionType === filterType ||
							p.promotionType === defPromotionType.walletBonus) &&
						!isExpiry({ ...p, isLogin: userInfo.isLogin })
					);
				} else {
					return (
						p.promotionType === filterType &&
						!isExpiry({ ...p, isLogin: userInfo.isLogin })
					);
				}
			} else {
				return isExpiry({ ...p, isLogin: userInfo.isLogin });
			}
		})
		.map(p => {
			if (p.actionLink?.startsWith("Promotion/Bonus?")) {
				let lang =
					p.fromDB || p.lang.includes(userInfo.langId)
						? userInfo.langId
						: "en";
				let actionLinkByLang = p.fromDB
					? null
					: p.actionLinkByLang?.find(a => a.lang === userInfo.langId);
				let actionLink = actionLinkByLang
					? actionLinkByLang.link
					: p.actionLink;

				let href = `${config.t_and_cURL}${
					p.urlWithLang || p.fromDB ? `/${lang}` : ""
				}/${actionLink}`;

				let imgSRC = p.fromDB
					? p.imgURL
					: `${config.imgUrl}/CMS/${
							siteInfo().siteName
					  }/Promotion/${lang}/${p.img}`;

				return (
					<div
						href={href}
						className="promodule"
						target="_blank"
						rel="noopener noreferrer"
						key={`promotion-${userInfo.langId}-${p.bonusCode}`}>
						<img src={imgSRC} alt={p.imgName ?? ""} />
						<div className="protitle">{p.title}</div>
						<div className="text">{p.description}</div>
						<div className="btn-group">
							<button className="white">
								{i18n.lbl_Details}
							</button>
						</div>
					</div>
				);
			} else {
				let imgSRC = p.banner;
				let _isClaimed = isClaimed(p);
				let _isNew = _isClaimed ? false : isNew(p);
				let _isExpiry = tab === defTabs.Expried.key;
				return (
					<div
						className={`promodule${p.isJoin ? " open" : ""}${
							_isExpiry ? " Expired" : ""
						}`}
						key={`promotion-${userInfo.langId}-${p.bonusCode}`}>
						{_isClaimed ? <div className="claimed"></div> : null}
						{_isNew ? <div className="new active"></div> : null}
						<img src={imgSRC} alt={p.imgName ?? ""} />
						<div className="protitle">{p.title}</div>
						<div className="text">{p.description}</div>
						<div className="rollover">
							<div>
								<div className="icon icon-icon32px_time">
									{i18n.lbl_RemainingTime}
								</div>
								<div>
									{RemainTime({
										promotionInfo: p,
										i18n,
										isLogin: userInfo.isLogin
									})}
								</div>
								<div className="icon icon-icon32px_">
									{i18n.lbl_RollOver}
								</div>
								<div>{p.rollOver}X</div>
							</div>
						</div>
						<div className="btn-group">
							<Link
								to={`/${path.promotionInfo.root}?BonusCode=${p.bonusCode}`}
								className="white">
								{i18n.lbl_Details}
							</Link>
							<JoinBtn
								promotionInfo={p}
								func_CallBack={getPromotionListV2}
							/>
						</div>
					</div>
				);
			}
		});

	let staticRows =
		tab === defTabs.Processing.key && filterType === defFilterType.all
			? StaticPromotionList.map(p => {
					return (
						<div
							className="promodule"
							key={`static-promotion-${userInfo.langId}-${p.bonusCode}`}>
							<img
								src={p.imgUrl?.[userInfo.langId]}
								alt={p.bonusCode ?? ""}
							/>
							<div className="protitle">
								{p.title?.[userInfo.langId]}
							</div>
							<div className="text">
								{p.description?.[userInfo.langId]}
							</div>
							<div className="btn-group">
								<a
									className="white"
									href={p.bannerLink?.[userInfo.langId]}
									target="_blank"
									rel="noopener noreferrer">
									{i18n.lbl_Details}
								</a>
							</div>
						</div>
					);
			  })
			: null;

	return (
		<>
			<Tab i18n={i18n} tab={tab} onClickTab={onClickTab} />
			<Nav
				i18n={i18n}
				tab={tab}
				filterType={filterType}
				onClickFilter={onClickFilter}
			/>
			{rows}
			{staticRows}
		</>
	);
};

const Tab = ({ i18n, tab, onClickTab }) => {
	let rows = Object.values(defTabs).map(t => {
		return (
			<a
				key={`promo-tab-${t.key}`}
				onClick={onClickTab.bind(this, t.key)}
				className={tab === t.key ? "open" : ""}>
				{i18n[t.displayKey]}
			</a>
		);
	});
	return <div className="tag">{rows}</div>;
};

const Nav = ({ i18n, filterType, onClickFilter, tab }) => {
	let rows =
		tab === defTabs.Expried.key
			? null
			: defPromotionNav.map(n => {
					return (
						<button
							key={`promo-nav-${n.value}`}
							className={filterType === n.value ? "open" : ""}
							onClick={onClickFilter.bind(this, n.value)}>
							{i18n[n.displayKey]}
						</button>
					);
			  });
	return <div className="inputBox filterBtn">{rows}</div>;
};

export default IndexPage;
