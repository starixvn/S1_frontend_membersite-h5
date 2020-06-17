import React, { useState, useEffect, useContext } from "react";
import Slider from "../components/casino/slider";
import defNav from "../components/casino/defNav";
import Nav from "../components/casino/nav";
import SearchBox from "../components/casino/searchBox";
import { api_GetGamelist } from "../service/api/site";
import Games from "../components/casino/games";
import {
	i18nContext,
	userInfoContext,
	navContext,
	defPanel
} from "../components/common/context";
import {
	api_SetFavoriteGame,
	api_GetFavoriteGame
} from "../service/api/account";
import { GET_CASINO_ENTER_PAGE } from "../service/enterPage";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const [selNav, setSelNav] = useState(() => {
		return Object.keys(defNav)?.[0];
	});

	const [favorite, setFavorite] = useState([]);
	const [searchInfo, setSearchInfo] = useState({
		searchText: "",
		provider: { idx: 0, value: null },
		gameType: { idx: 0, value: null }
	});

	const [gameDatas, setGameDatas] = useState([]);
	const [selGameInfo, setSelGameInfo] = useState(null);
	const [displayGames, setDisplayGames] = useState([]);

	useEffect(() => {
		let mounted = true;
		api_GetGamelist().then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setGameDatas(res.data.data);
				FilterGames(searchInfo, selNav, res.data.data);
			}
		});

		api_GetFavoriteGame().then(res => {
			if (res.data.errorCode === 0 && res.data.data) {
				let fav = res.data.data.map(f => {
					return `${f.providerId}_${f.gameId}`;
				});
				if (mounted) {
					setFavorite(fav);
				}
			}
		});
		return () => (mounted = false);
	}, []);

	const SetFavorite = (tpId, gameId) => {
		let key = `${tpId}_${gameId}`;
		let isRemove = favorite.includes(key);
		let newFav = isRemove
			? favorite.filter(f => f !== key)
			: [...favorite, key];
		setFavorite(() => newFav);
		api_SetFavoriteGame(tpId, gameId, isRemove);
	};

	const SelectNav = navKey => {
		if (selNav !== navKey) {
			setSelNav(navKey);
			FilterGames(searchInfo, navKey, null);
		}
	};

	const CloseSelGame = () => {
		setSelGameInfo(null);
	};

	const SelectGame = (tpId, gameInfo) => {
		if (selGameInfo === null) {
			setSelGameInfo({ tpId, ...gameInfo });
		}
	};

	const EditSearchField = (colName, v) => {
		if (JSON.stringify(searchInfo[colName]) !== JSON.stringify(v)) {
			let newData = {
				...searchInfo,
				[colName]: v
			};

			setSearchInfo(() => newData);
			FilterGames(newData, selNav, null);
		}
	};

	const matchKeyword = (name, _keyword) => {
		let keyword = _keyword.toLowerCase();
		return (
			Object.keys(name).filter(key => {
				return name[key].toLowerCase().indexOf(keyword) !== -1;
			}).length > 0
		);
	};

	const FilterGames = (_searchInfo, _nav, initGameDatas) => {
		let _gameDatas = initGameDatas ?? gameDatas;
		let tpId = _searchInfo.provider.value;
		let gameCategory = _searchInfo.gameType.value;
		let searchText = _searchInfo.searchText;

		const matchFilter = (tpId, g) => {
			let matchNav =
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.FAVOURITE.key &&
					favorite.includes(`${tpId}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;

			return (
				matchNav &&
				(gameCategory === null || g.category1 === gameCategory) &&
				(searchText === "" || matchKeyword(g.name, searchText))
			);
		};

		let games = _gameDatas
			.filter(tp => {
				return (
					(tpId === null || tp.value === tpId) &&
					tp.gameList.data.filter(g => {
						return matchFilter(tp.value, g);
					}).length !== 0
				);
			})
			.map(tp => {
				let gameList = tp.gameList.data.filter(g => {
					return matchFilter(tp.value, g);
				});

				return {
					...tp,
					gameList: {
						...tp.gameList,
						data: gameList
					}
				};
			});

		setDisplayGames(games);
	};

	const ClickPlay = freePlay => {
		if (userInfo.isLogin) {
			GET_CASINO_ENTER_PAGE(
				selGameInfo.tpId,
				selGameInfo.gameId,
				freePlay,
				userInfo.langId
			);
		} else {
			setNav(defPanel.login);
		}
	};

	return (
		<>
			<Slider />
			<Nav selNav={selNav} SelectNav={SelectNav} />
			<SearchBox
				gameDatas={gameDatas}
				{...searchInfo}
				EditSearchField={EditSearchField}
			/>
			<Games
				SelectGame={SelectGame}
				Games={displayGames}
				Favorite={favorite}
				SetFavorite={SetFavorite}
			/>
			{selGameInfo === null ? null : (
				<div className="slotFunction open">
					<div className="title text-org">
						{selGameInfo.name[userInfo.langId] ??
							selGameInfo.name.en}
					</div>
					<button
						className="icon icon-cancel-circle"
						onClick={CloseSelGame}></button>
					<div className="btn-group">
						<button
							className="white"
							onClick={ClickPlay.bind(this, true)}>
							{i18n.lbl_Free}
						</button>
						<button
							className="orange"
							onClick={ClickPlay.bind(this, false)}>
							{i18n.lbl_PlayNow}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default IndexPage;
