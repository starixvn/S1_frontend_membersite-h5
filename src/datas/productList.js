const gameList = [
	{
		category: "sports",
		categoryIcon: "sports",
		translateKey: "lbl_Sports",
		items: [
			{
				icon: "soccer",
				gameId: 1,
				tpId: 1,
				img: `sport.jpg`,
				spanTextKey: "lbl_Sports"
			},
			{
				icon: "virtual-sports",
				gameId: 180,
				tpId: 1,
				img: `virtual_sports.jpg`,
				spanTextKey: "lbl_VirtualSports"
			}
		]
	},
	{
		category: "virtualsports",
		categoryIcon: "e-sports",
		translateKey: "lbl_eSports",
		items: [
			{
				icon: "e-sports",
				gameId: 43,
				img: `e-sports.jpg`,
				tpId: 1,
				spanTextKey: "lbl_eSports"
			}
		]
	},
	{
		category: "livecasino",
		categoryIcon: "livecasino",
		className: "casinoList",
		translateKey: "lbl_LiveCasino",
		comingSoonImg: `coming_soon.jpg`,
		items: [
			{
				gameId: 101,
				tpId: 5,
				img: `LIVEcasino_PP.jpg`
			},
			{
				gameId: 3,
				tpId: 3,
				img: `LIVEcasino_AG.jpg`
			},
			{
				gameId: 4,
				tpId: 4,
				img: `LIVEcasino_DG.jpg`
			},
			{
				gameId: 2,
				tpId: 2,
				img: `LIVEcasino_SA.jpg`
			},
			{
				gameId: 12,
				tpId: 12,
				img: `LIVEcasino_AB.jpg`
			}
		]
	},
	{
		category: "casino",
		categoryIcon: "casino",
		className: "casinoList",
		translateKey: "lbl_Casino",
		comingSoonImg: `coming_soon.jpg`,
		items: [
			{
				gameId: 208,
				tpId: 1,
				img: "casino_ow.jpg"
			},
			{
				tpId: 5,
				parameter: { tpId: 5 },
				img: "casino_PP.jpg"
			},
			{
				tpId: 10,
				parameter: { tpId: 10 },
				img: "casino_SG.jpg"
			},
			{
				tpId: 14,
				parameter: { tpId: 14 },
				img: "casino_PG.jpg"
			},
			{
				tpId: 9,
				parameter: { tpId: 9 },
				img: "casino_JOKER.jpg"
			},
			{
				tpId: 8,
				parameter: { tpId: 8 },
				img: "casino_YGG.jpg"
			},
			{
				tpId: 6,
				parameter: { tpId: 6 },
				img: "casino_GPI.jpg"
			}
		]
	},
	{
		category: "game",
		categoryIcon: "game",
		translateKey: "lbl_Fishing",
		items: [
			{
				icon: "game",
				gameId: 10,
				tpId: 7,
				img: "fish.jpg",
				spanTextKey: "lbl_Fishing"
			}
		]
	},
	{
		category: "kelo",
		categoryIcon: "kelo",
		translateKey: "lbl_Lottery",
		items: [
			{
				icon: "lottery",
				gameId: 223,
				tpId: 1,
				img: "id4d.jpg",
				spanTextKey: "lbl_Indo4d",
				allowCurrency: [4, 15]
			},
			{
				icon: "keno",
				gameId: 202,
				tpId: 1,
				img: `keno.jpg`,
				spanTextKey: "lbl_Keno"
			},
			{
				icon: "lottery",
				gameId: 220,
				tpId: 1,
				img: "lottery.jpg",
				spanTextKey: "lbl_Lottery"
			},
			{
				icon: "lottery",
				gameId: 161,
				tpId: 1,
				img: "number_game.jpg",
				spanTextKey: "lbl_NumberGame"
			}
		]
	}
];

export default gameList;
