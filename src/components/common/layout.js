import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext, i18nContext } from "../common/context";
import "../../styles/Nova88/css/style-dark.css";
import "../../styles/Nova88/css/style.css";
import "../../styles/Nova88/css/font.css";
import { useMatch } from "@reach/router";
import path from "../../path";

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
	}
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	let position = nav === null ? {} : { position: "fixed" };

	let _matchMember = useMatch(`/${path.member.root}/*`) !== null;
	let _matchDeposit = useMatch(`/${path.deposit.root}/*`) !== null;
	let _matchWithdrawal = useMatch(`/${path.withdrawal.root}/*`) !== null;
	let _matchTransfer = useMatch(`/${path.transfer.root}/*`) !== null;
	let _matchStatement = useMatch(`/${path.statement.root}/*`) !== null;
	let pageInfo = {};
	if (_matchMember) {
		pageInfo = _PageInfo.member;
	} else if (_matchDeposit) {
		pageInfo = _PageInfo.deposit;
	} else if (_matchWithdrawal) {
		pageInfo = _PageInfo.withdrawal;
	} else if (_matchTransfer) {
		pageInfo = _PageInfo.transfer;
	} else if (_matchStatement) {
		pageInfo = _PageInfo.statement;
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
