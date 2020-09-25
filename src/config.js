export const sites = {
	Nova88: "Nova88"
};

export const siteName = sites.Nova88;

export const siteInfo = () => {
	switch (siteName) {
		case sites.Nova88:
			return {
				siteName: "Nova88",
				siteDefaultLang: "en",
				siteLangList: ["en", "cs", "th", "id"],
				logo: "logo.svg",
				description:
					"Nova88 is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.",
				iosIcon: "Nova88_256_2.png",
				socialMedia: {
					fb: {
						icon: "facebook2",
						link: "https://www.facebook.com/nova88official/",
						displayKey: "lbl_Facebook"
					},
					twitter: {
						icon: "twitter",
						link: "https://twitter.com/nova88official",
						displayKey: "lbl_Twitter"
					},
					ig: {
						icon: "instagram",
						link: "https://www.instagram.com/nova88.net_official",
						displayKey: "lbl_Instagram"
					}
				}
			};

		default:
			return {};
	}
};

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "",
			imgUrl: "",
			t_and_cURL: ""
	  }
	: {
			siteName,
			appURL: "http://localhost:3000",
			// apiURL: "http://localhost:60930",
			// imgUrl: "http://localhost:60930",
			// t_and_cURL: "http://localhost:60930",
			// openURL: "http://localhost:60930"

			apiURL: "http://www.n88dev.com",
			imgUrl: "http://www.n88dev.com",
			t_and_cURL: "http://www.n88dev.com",
			openURL: "http://www.n88dev.com"
	  };
