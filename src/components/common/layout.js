import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext, i18nContext, defNavPanel } from "../common/context";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";
import { useMatch, useLocation } from "@reach/router";
import path from "../../path";

const defPageInfo = {
	default: {
		titleKey: "",
		className: "",
		hideLogo: false
	},
	member: {
		titleKey: "lbl_MyAccount",
		className: "main",
		hideLogo: true
	},
	deposit: {
		titleKey: "lbl_Deposit",
		className: "main",
		hideLogo: true
	},
	withdrawal: {
		titleKey: "lbl_Withdrawal",
		className: "main",
		hideLogo: true
	},
	transfer: {
		titleKey: "lbl_Transfer",
		className: "main",
		hideLogo: true
	},
	statement: {
		titleKey: "lbl_Statement",
		className: "main",
		hideLogo: true
	},
	message: {
		titleKey: "lbl_Message",
		className: "main Message",
		hideLogo: true
	},
	announcement: {
		titleKey: "lbl_Message",
		className: "main Announcement",
		hideLogo: true
	},
	casino: {
		titleKey: "lbl_Casino",
		className: "main casino",
		hideLogo: true
	},
	forgetPwd: {
		titleKey: "lbl_ForgetPassword",
		className: "main",
		hideLogo: true
	},
	resetPwd: {
		titleKey: "lbl_ResetPassword",
		className: "main",
		hideLogo: true
	},
	changePwd: {
		titleKey: "lbl_ChangePassword",
		className: "main",
		hideLogo: true
	},
	setting: {
		titleKey: "setting",
		className: "main",
		hideLogo: true
	}
};

const GetPageInfo = locationPath => {
	let pageInfoKey =
		locationPath === "/"
			? []
			: Object.keys(path).filter(p => {
					let _location = locationPath.split("/");
					return _location?.[1] === path[p].root;
			  });

	pageInfoKey = pageInfoKey?.length > 0 ? pageInfoKey[0] : null;
	return pageInfoKey
		? {
				titleKey: defPageInfo[pageInfoKey].titleKey,
				className: defPageInfo[pageInfoKey].className,
				hideLogo: defPageInfo[pageInfoKey].hideLogo
		  }
		: defPageInfo.default;
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	const location = useLocation();
	let pageInfo = GetPageInfo(location.pathname);

	let _matchLogin = useMatch(`/${path.login.root}`) !== null;
	let position =
		nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join
			? { position: "fixed" }
			: {};

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
