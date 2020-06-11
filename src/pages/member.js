import React from "react";
import TabPage from "../components/common/tabPage";

const defTabs = {
	default: {
		to: "/member",
		displayKey: "lbl_Profile"
	},
	bankInfo: {
		to: "bankinfo",
		displayKey: "lbl_BankInfo"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
