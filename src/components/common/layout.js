import React from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";

const Layout = ({ children }) => {
	return (
		<div>
			<Header siteTitle={"Nova88"} />
			<Header siteTitle="Nova88" />
			<main style={{ position: "fixed" }}>{children}</main>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
