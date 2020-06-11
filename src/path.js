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
					root: "/",
					setOnlineBanking: {
						root: ":sysId"
					}
				}
			},
			mobilePay: {
				root: "mobilePay",
				sub: {
					root: "/",
					setMobilePay: {
						root: ":sysId"
					}
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
