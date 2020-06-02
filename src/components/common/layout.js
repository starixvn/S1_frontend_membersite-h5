import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";
import { navContext } from "../context/nav";

const Layout = ({ children }) => {
	const { nav } = useContext(navContext);
	let position = nav === null ? {} : { position: "fixed" };
	return (
		<div>
			<Header siteTitle="Nova88" />
			<main style={position}>{children}</main>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
