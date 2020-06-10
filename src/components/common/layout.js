import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext, i18nContext } from "../common/context";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";
import { useMatch } from "@reach/router";

const _PageInfo = {
	default: {
		titleKey: "",
		className: "",
		hideLogo: false
	},
	member: {
		titleKey: "lbl_Member",
		className: "main",
		hideLogo: true
	},

	deposit: {
		titleKey: "lbl_Deposit",
		className: "main",
		hideLogo: true
	}
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	let position = nav === null ? {} : { position: "fixed" };

	let _match = useMatch("/member") !== null;
	let _match2 = useMatch("/deposit/*") !== null;
	let pageInfo = {};
	if (_match) {
		pageInfo = _PageInfo.member;
	} else if (_match2) {
		pageInfo = _PageInfo.deposit;
	}

	return (
		<>
			<Header
				title={i18n[pageInfo.titleKey] ?? pageInfo.titleKey}
				hideLogo={pageInfo.hideLogo}
			/>
			<main style={position} className={pageInfo.className ?? ""}>
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
