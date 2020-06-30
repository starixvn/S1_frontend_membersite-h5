import path from "../path";
import sport from "../styles/Nova88/img/sport.jpg";
import virtual_sports from "../styles/Nova88/img/virtual_sports.jpg";
import LIVEcasino_PP from "../styles/Nova88/img/LIVEcasino_PP.jpg";
import LIVEcasino_AG from "../styles/Nova88/img/LIVEcasino_AG.jpg";
import LIVEcasino_DG from "../styles/Nova88/img/LIVEcasino_DG.jpg";
import LIVEcasino_SA from "../styles/Nova88/img/LIVEcasino_SA.jpg";
import LIVEcasino_AB from "../styles/Nova88/img/LIVEcasino_AB.jpg";
import casinoNOVA from "../styles/Nova88/img/casinoNOVA.jpg";
import casinoOW from "../styles/Nova88/img/casinoOW.jpg";
import keno from "../styles/Nova88/img/keno.jpg";
import lottery from "../styles/Nova88/img/lottery.jpg";
import fishing from "../styles/Nova88/img/fish.jpg";

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
				img: sport,
				spanTextKey: "lbl_Sports"
			}
		]
	},
	{
		category: "virtualsports",
		categoryIcon: "virtualsports",
		translateKey: "lbl_eSports",
		items: [
			{
				icon: "virtualsports",
				gameId: 43,
				img: virtual_sports,
				tpId: 1,
				spanTextKey: "lbl_eSports"
			}
		]
	},
	{
		category: "livecasino",
		categoryIcon: "livecasino",
		className: "livecasinoList",
		translateKey: "lbl_LiveCasino",
		items: [
			{
				gameId: 101,
				tpId: 5,
				img: LIVEcasino_PP
			},
			{
				gameId: 3,
				tpId: 3,
				img: LIVEcasino_AG
			},
			{
				gameId: 4,
				tpId: 4,
				img: LIVEcasino_DG
			},
			{
				gameId: 2,
				tpId: 2,
				img: LIVEcasino_SA
			},
			{
				gameId: 12,
				tpId: 12,
				img: LIVEcasino_AB
			}
		]
	},
	{
		category: "casino",
		categoryIcon: "casino",
		translateKey: "lbl_Casino",
		items: [
			{
				icon: "nova-casino",
				path: path.casino.root,
				img: casinoNOVA,
				spanTextKey: "lbl_SelfCasino"
			},
			{
				icon: "ow-casino",
				gameId: 1,
				tpId: 208,
				img: casinoOW,
				spanTextKey: "lbl_OWCasino"
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
				img: fishing,
				spanTextKey: "lbl_Fishing"
			}
		]
	},
	{
		category: "kelo",
		categoryIcon: "kelo",
		translateKey: "lbl_KenoAndLottery",
		items: [
			{
				icon: "keno",
				gameId: 202,
				tpId: 1,
				img: keno,
				spanTextKey: "lbl_Keno"
			},
			{
				icon: "lottery",
				gameId: 220,
				tpId: 1,
				img: lottery,
				spanTextKey: "lbl_Lottery"
			}
		]
	}
];

export default gameList;
