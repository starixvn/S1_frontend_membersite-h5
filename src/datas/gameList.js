import path from "../path";
import gamePic1 from "../styles/Nova88/img/gamePic1.jpg";
import gamePic2 from "../styles/Nova88/img/gamePic2.jpg";
import gamePic3 from "../styles/Nova88/img/gamePic3.jpg";
import gamePic4 from "../styles/Nova88/img/gamePic4.jpg";
import gamePic6 from "../styles/Nova88/img/gamePic6.jpg";
import gamePic7 from "../styles/Nova88/img/gamePic7.jpg";
import gamePic9 from "../styles/Nova88/img/gamePic9.jpg";
import LIVEcasino_PP from "../styles/Nova88/img/LIVEcasino_PP.jpg";
import LIVEcasino_AG from "../styles/Nova88/img/LIVEcasino_AG.jpg";
import LIVEcasino_DG from "../styles/Nova88/img/LIVEcasino_DG.jpg";
import LIVEcasino_SA from "../styles/Nova88/img/LIVEcasino_SA.jpg";
import LIVEcasino_AB from "../styles/Nova88/img/LIVEcasino_AB.jpg";
import casinoNOVA from "../styles/Nova88/img/casinoNOVA.jpg";
import casinoOW from "../styles/Nova88/img/casinoOW.jpg";

const gameList = [
	{
		category: "sports",
		items: [
			{ icon: "soccer", gameId: 1, tpId: 1, imgId: gamePic1 },
			{ icon: "baseball", gameId: 8, tpId: 1, imgId: gamePic2 },
			{ icon: "basketball", gameId: 2, tpId: 1, imgId: gamePic3 },
			{ icon: "badminton", gameId: 9, tpId: 1, imgId: gamePic4 },
			{ icon: "football", gameId: 3, tpId: 1, imgId: gamePic7 },
			{ icon: "hockey", gameId: 4, tpId: 1, imgId: gamePic9 },
			{ icon: "tennis", gameId: 5, tpId: 1, imgId: gamePic6 }
		],
		translation: "lbl_Sports"
	},
	{
		category: "virtualsports",
		items: [],
		_blank: true,
		translation: "lbl_eSports",
		gameId: 43,
		tpId: 1
	},
	{
		category: "livecasino",
		items: [
			{
				icon: "PP",
				gameId: 101,
				tpId: 5,
				imgId: LIVEcasino_PP,
				span: "PP"
			},
			{
				icon: "AG",
				gameId: 3,
				tpId: 3,
				imgId: LIVEcasino_AG,
				span: "AG"
			},
			{
				icon: "DG",
				gameId: 4,
				tpId: 4,
				imgId: LIVEcasino_DG,
				span: "DG"
			},
			{
				icon: "SA",
				gameId: 2,
				tpId: 2,
				imgId: LIVEcasino_SA,
				span: "SA"
			},
			{
				icon: "AB",
				gameId: 12,
				tpId: 12,
				imgId: LIVEcasino_AB,
				span: "AB"
			}
		],
		translation: "lbl_LiveCasino"
	},
	{
		category: "casino",
		items: [
			{
				icon: "nova-casino",
				path: path.casino.root,
				imgId: casinoNOVA,
				span: "NOVA CASINO"
			},
			{
				icon: "ow-casino",
				gameId: 1,
				tpId: 208,
				imgId: casinoOW,
				span: "OW CASINO"
			}
		],
		translation: "lbl_Casino"
	},
	{
		category: "game",
		items: [
			// { icon: "soccer", gameId: 1, tpId: 1 },
			// { icon: "basketball", gameId: 1, tpId: 2 },
			// { icon: "football", gameId: 1, tpId: 3 },
			// { icon: "icehockey", gameId: 1, tpId: 4 },
			// { icon: "tennis", gameId: 1, tpId: 5 },
			// { icon: "baseball", gameId: 1, tpId: 8 },
			// { icon: "badminton", gameId: 1, tpId: 9 }
		],
		translation: "lbl_Games"
	},
	{
		category: "keno",
		items: [
			// { icon: "soccer", gameId: 1, tpId: 1 },
			// { icon: "basketball", gameId: 1, tpId: 2 },
			// { icon: "football", gameId: 1, tpId: 3 },
			// { icon: "icehockey", gameId: 1, tpId: 4 },
			// { icon: "tennis", gameId: 1, tpId: 5 },
			// { icon: "baseball", gameId: 1, tpId: 8 },
			// { icon: "badminton", gameId: 1, tpId: 9 }
		],
		translation: "lbl_KenoAndLottery"
	}
];

export default gameList;
