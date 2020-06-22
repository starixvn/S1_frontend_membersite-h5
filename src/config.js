const siteName = "Nova88";

export default process.env.NODE_ENV === "production"
	? {
			siteName,
			apiURL: "",
			openURL: "https://release.nova88.net",
			imgUrl: "https://release.nova88.net",
			t_and_cURL: "https://release.nova88.net",
			//apiURL: "https://release.nova88.net",
			appURL: "https://m.nova88.net"
	  }
	: {
			siteName,
			apiURL: "http://m.n88dev.com",
			imgUrl: "http://m.n88dev.com",
			t_and_cURL: "http://m.n88dev.com",
			//apiURL: "http://localhost:60930",
			appURL: "http://localhost:3000"
	  };
