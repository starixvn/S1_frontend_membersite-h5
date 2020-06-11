import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.deposit.root}`,
		displayKey: "lbl_Deposit"
	},
	History: {
		to: path.deposit.sub.history.root,
		displayKey: "lbl_DepositHistory"
	}
};

const IndexPage = props => {
	console.log(defTabs);
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
