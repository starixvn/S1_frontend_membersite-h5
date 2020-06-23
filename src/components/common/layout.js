import React, { useContext } from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";
import { navContext, i18nContext, defNavPanel } from "../common/context";
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
	}
};

const Layout = ({ children }) => {
	const { i18n } = useContext(i18nContext);
	const { nav } = useContext(navContext);
	let position = {};
	let pageInfo = _PageInfo.default;
	let _matchLogin = useMatch(`/${path.login.root}`) !== null;
	let _matchMember = useMatch(`/${path.member.root}/*`) !== null;
	let _matchDeposit = useMatch(`/${path.deposit.root}/*`) !== null;
	let _matchWithdrawal = useMatch(`/${path.withdrawal.root}/*`) !== null;
	let _matchTransfer = useMatch(`/${path.transfer.root}/*`) !== null;
	let _matchStatement = useMatch(`/${path.statement.root}/*`) !== null;
	let _matchMessage = useMatch(`/${path.message.root}`) !== null;
	let _matchAnnouncement =
		useMatch(
			`/${path.message.root}/${path.message.sub.announcement.root}/*`
		) !== null;
	let _matchCasino = useMatch(`/${path.casino.root}`) !== null;

	if (nav === defNavPanel.login || _matchLogin || nav === defNavPanel.join) {
		position = { position: "fixed" };
	} else {
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
		} else if (_matchMessage) {
			pageInfo = _PageInfo.message;
		} else if (_matchAnnouncement) {
			pageInfo = _PageInfo.announcement;
		} else if (_matchCasino) {
			pageInfo = _PageInfo.casino;
		}
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
