export default {
	home: {
		root: "/"
	},
	promotion: {
		root: "promotion"
	},
	wallet: {
		root: "wallet"
	},
	livechat: {
		root: "livechat"
	},
	member: {
		root: "member",
		sub: {
			root: "/",
			bankInfo: {
				root: "bankinfo"
			}
		}
	},
	deposit: {
		root: "deposit",
		sub: {
			root: "/",
			onlineBank: {
				root: "onlineBank",
				sub: {
					root: "/onlineBank",
					setOnlineBanking: ":sysId"
				}
			},
			mobilePay: {
				root: "mobilePay",
				sub: {
					root: "/mobilePay",
					setMobilePay: ":sysId"
				}
			},
			localBank: {
				root: "localBank"
			},
			history: {
				root: "history"
			}
		}
	},
	withdrawal: {
		root: "withdrawal",
		sub: {
			root: "/",
			history: {
				root: "history"
			}
		}
	},
	transfer: {
		root: "transfer",
		sub: {
			root: "/",
			history: {
				root: "history"
			}
		}
	},
	statement: {
		root: "statement"
	}
};
