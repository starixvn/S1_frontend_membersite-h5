import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext } from "../context/nav";
import { useMatch } from "@reach/router";
import { userInfoContext } from "../context/userInfo";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";

const Layout = ({ children }) => {
	const { userInfo } = useContext(userInfoContext);
	const { nav } = useContext(navContext);
	let position = nav === null ? {} : { position: "fixed" };

	let pageInfo = {
		title: null,
		className: ""
	};

	if (useMatch("/member")) {
		if (userInfo.isLogin) {
			pageInfo.title = "member";
			pageInfo.className = "main";
		} else {
			window.location.href = "/";
		}
	}

	return (
		<div>
			<Header title={pageInfo.title} />
			<main style={position} className={pageInfo.className}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
