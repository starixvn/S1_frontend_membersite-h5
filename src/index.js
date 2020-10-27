import React from "react";
import App from "./app";
//import * as serviceWorker from "./serviceWorker";
import { render } from "react-snapshot";
import "./styles/css/style-dark.css";
import "./styles/css/style.css";
import "./styles/css/font.css";
import "./styles/css/swiper.css";
import { Helmet } from "react-helmet";
import config from "./config";

const Iovation = () => {
	return (
		<Helmet>
			<script>
				{`
				window.IGLOO = window.IGLOO || {
					"enable_flash" : false,
					"loader" : {
					  "fp_dyn" : false,
					  "version" : "5.2.2"
					}
				  };
				`}
			</script>
			<script
				src={`${config.t_and_cURL}/common/js/loader_only.js?v=201027`}
				type="text/javascript"></script>
		</Helmet>
	);
};

const Content = () => {
	return (
		<React.StrictMode>
			<Iovation />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

//serviceWorker.register();
