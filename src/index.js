import React from "react";
import App from "./app";
//import * as serviceWorker from "./serviceWorker";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import config, { siteInfo } from "./config";

const _siteInfo = siteInfo();

render(
	<>
		<Helmet>
			<title>{_siteInfo.siteName}</title>
			<meta name="description" content={_siteInfo.description} />
			<link rel="manifest" href={`${_siteInfo.siteName}_manifest.json`} />
			<link
				rel="apple-touch-icon"
				sizes="256x256"
				href={`./styles/${_siteInfo.siteName}/img/${_siteInfo.iosIcon}`}
			/>
			<link
				rel="icon"
				href={`./styles/${_siteInfo.siteName}/img/favicon.ico`}
			/>
		</Helmet>
		<React.StrictMode>
			<>
				<link
					href={`./styles/${config.siteName}/css/style-dark.css`}
					rel="stylesheet"
				/>
				<link
					href={`./styles/${config.siteName}/css/style.css`}
					rel="stylesheet"
				/>
				<link
					href={`./styles/${config.siteName}/css/font.css`}
					rel="stylesheet"
				/>
				<link
					href={`./styles/${config.siteName}/css/swiper.css`}
					rel="stylesheet"
				/>
			</>
			<App />
		</React.StrictMode>
	</>,
	document.getElementById("root")
);

//serviceWorker.register();
