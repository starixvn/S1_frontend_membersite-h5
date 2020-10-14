export const defPromoStatus = {
	running: 1,
	Canceled: 2,
	Expiry: 3,
	TransferOut: 5
};

export const defPromotionType = {
	firstDeposit: 1,
	reDeposit: 2,
	freeBet: 3,
	walletBonus: 5,
	rebate: 6,
	cashback: 7
};

export const defFilterType = {
	all: 0,
	firstDeposit: 1,
	freeBet: 3
};

export const defPromotionNav = [
	{
		displayKey: "lbl_All",
		value: defFilterType.all
	},
	{
		displayKey: "lbl_PromotionCategory1",
		value: defFilterType.firstDeposit
	},
	{
		displayKey: "lbl_FreeBet",
		value: defFilterType.freeBet
	}
];
