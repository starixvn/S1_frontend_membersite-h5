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
				window.io_global_object_name = "IGLOO"
				window.IGLOO = window.IGLOO || {
				  "enable_flash" : false,
				  "bbout_element_id" : "",  // this can be changed to store in a different hidden field (or removed to use a different collection method)
				  "loader" : {
					"uri_hook" : "/iojs",
					"subkey"  : "${config.siteName}",
					"version" : "general5"
				  }
				};
				`}
			</script>
			<script
				src={`${config.t_and_cURL}/common/js/loader_only.js`}
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
