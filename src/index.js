import React, { Component } from "react";
import App from "./app";
//import * as serviceWorker from "./serviceWorker";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import { siteInfo } from "./config";

// import "./styles/Nova88/css/style-dark.css";
// import "./styles/Nova88/css/style.css";
// import "./styles/Nova88/css/font.css";
// import "./styles/Nova88/css/swiper.css";

const _siteInfo = siteInfo();

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = { loaded: false };
	}
	componentDidMount = () => {
		this.importStyle().then(() => {
			this.setState({ loaded: true });
		});
	};
	importStyle = async () => {
		await import(`./styles/${_siteInfo.siteName}/css/style-dark.css`);
		await import(`./styles/${_siteInfo.siteName}/css/style.css`);
		await import(`./styles/${_siteInfo.siteName}/css/font.css`);
		await import(`./styles/${_siteInfo.siteName}/css/swiper.css`);
	};
	render() {
		return (
			<>
				<Helmet>
					<title>{_siteInfo.siteName}</title>
					<meta name="description" content={_siteInfo.description} />
					<link
						rel="manifest"
						href={`/${_siteInfo.siteName}_manifest.json`}
					/>
					<link
						rel="apple-touch-icon"
						sizes="256x256"
						href={`./styles/${_siteInfo.siteName}/img/${_siteInfo.iosIcon}`}
					/>
				</Helmet>
				{this.state.loaded === true ? (
					<React.StrictMode>
						<App />
					</React.StrictMode>
				) : null}
			</>
		);
	}
}

render(<Content />, document.getElementById("root"));

//serviceWorker.register();
