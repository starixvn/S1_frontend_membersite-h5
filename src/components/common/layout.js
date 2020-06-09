import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext, userInfoContext } from "../common/context";
import { useMatch } from "@reach/router";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";

const Layout = ({ children }) => {
	const { userInfo } = useContext(userInfoContext);
	const { nav } = useContext(navContext);
	let position = nav === null ? {} : { position: "fixed" };

	let pageInfo = {
		title: null,
		className: "",
		hideLogo: false
	};

	let _match = useMatch("/member") !== null;
	let _match2 = useMatch("/deposit") !== null;
	if (_match || _match2) {
		if (userInfo.isLogin) {
			pageInfo.title = "Member";
			pageInfo.className = "main";
			pageInfo.hideLogo = true;
		} else {
			window.location.href = "/";
		}
	}

	return (
		<>
			<Header title={pageInfo.title} hideLogo={pageInfo.hideLogo} />
			<main style={position} className={pageInfo.className}>
				{children}
			</main>
			<Footer />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
