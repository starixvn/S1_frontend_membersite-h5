import path from "../path";
const gameList = [
	{
		category: "sports",
		items: [
			{ icon: "soccer", gameId: 1, tpId: 1 },
			{ icon: "basketball", gameId: 2, tpId: 1 },
			{ icon: "football", gameId: 3, tpId: 1 },
			{ icon: "icehockey", gameId: 4, tpId: 1 },
			{ icon: "tennis", gameId: 5, tpId: 1 },
			{ icon: "baseball", gameId: 8, tpId: 1 },
			{ icon: "badminton", gameId: 9, tpId: 1 }
		],
		translation: "lbl_Sports"
	},
	{
		category: "virtualsports",
		// items: [{ icon: "", gameId: 43, tpId: 1 }],
		items: [],
		_blank: true,
		translation: "lbl_eSports",
		gameId: 43,
		tpId: 1
	},
	{
		category: "livecasino",
		items: [
			{ icon: "soccer", gameId: 1, tpId: 1 },
			{ icon: "baseball", gameId: 1, tpId: 8 },
			{ icon: "basketball", gameId: 1, tpId: 2 },
			{ icon: "badminton", gameId: 1, tpId: 9 },
			{ icon: "icehockey", gameId: 1, tpId: 4 },
			{ icon: "tennis", gameId: 1, tpId: 5 },
			{ icon: "football", gameId: 1, tpId: 3 }
		],
		translation: "lbl_LiveCasino"
	},
	{
		category: "casino",
		items: [
			{ icon: "soccer", path: path.casino.root },
			{ icon: "basketball" }
		],
		translation: "lbl_Casino"
	},
	{
		category: "game",
		items: [
			{ icon: "soccer", gameId: 1, tpId: 1 },
			{ icon: "basketball", gameId: 1, tpId: 2 },
			{ icon: "football", gameId: 1, tpId: 3 },
			{ icon: "icehockey", gameId: 1, tpId: 4 },
			{ icon: "tennis", gameId: 1, tpId: 5 },
			{ icon: "baseball", gameId: 1, tpId: 8 },
			{ icon: "badminton", gameId: 1, tpId: 9 }
		],
		translation: "lbl_Games"
	},
	{
		category: "keno",
		items: [
			{ icon: "soccer", gameId: 1, tpId: 1 },
			{ icon: "basketball", gameId: 1, tpId: 2 },
			{ icon: "football", gameId: 1, tpId: 3 },
			{ icon: "icehockey", gameId: 1, tpId: 4 },
			{ icon: "tennis", gameId: 1, tpId: 5 },
			{ icon: "baseball", gameId: 1, tpId: 8 },
			{ icon: "badminton", gameId: 1, tpId: 9 }
		],
		translation: "lbl_KenoAndLottery"
	}
];

export default gameList;
