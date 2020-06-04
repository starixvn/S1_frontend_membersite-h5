import React, { useState, useContext } from "react";
import Member from "../components/member/profile";
import { i18nContext } from "../components/common/context";

const defTabs = {
	profile: "lbl_Profile",
	bankInfo: "lbl_BankInfo"
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const [tab, setTab] = useState(defTabs.profile);
	const handleTab = _tab => {
		if (tab !== _tab) {
			setTab(_tab);
		}
	};

	return (
		<>
			<div className="tag">
				<button
					className={tab === defTabs.profile ? "open" : ""}
					onClick={handleTab.bind(null, defTabs.profile)}>
					{i18n.lbl_Profile}
				</button>
				<button
					className={tab === defTabs.bankInfo ? "open" : ""}
					onClick={handleTab.bind(null, defTabs.bankInfo)}>
					{i18n.lbl_BankInfo}
				</button>
			</div>
			{tab === defTabs.profile ? <Member /> : <></>}
		</>
	);
};

export default IndexPage;
