import React from "react";
import TabPage from "../components/common/tabPage";

const defTabs = {
	default: {
		to: "/deposit",
		displayKey: "lbl_Deposit"
	},
	DepositHistory: {
		to: "history",
		displayKey: "lbl_DepositHistory"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
