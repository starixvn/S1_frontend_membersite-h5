const sites = {
	Goal123: "Goal123",
	Nova88: "Nova88"
};

const siteName = sites.Goal123;

export const siteInfo = () => {
	switch (siteName) {
		case sites.Goal123:
			return {
				siteName: "Goal123",
				logo: "logo.png",
				description:
					"Nova88 is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.",
				iosIcon: "Nova88_256_2.png"
			};
		case sites.Nova88:
			return {
				siteName: "Nova88",
				logo: "logo.svg",
				description:
					"Nova88 is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.",
				iosIcon: "Nova88_256_2.png",
				fb: "https://www.facebook.com/nova88official/",
				twitter: "https://twitter.com/nova88official",
				ig: "https://www.instagram.com/nova88official"
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
			apiURL: "http://m.n88dev.com",
			imgUrl: "http://m.n88dev.com",
			t_and_cURL: "http://m.n88dev.com",
			openURL: "http://m.n88dev.com"
	  };
