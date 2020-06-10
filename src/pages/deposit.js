import React, { useContext, useState } from "react";
import { Redirect } from "@reach/router";
import { userInfoContext, i18nContext } from "../components/common/context";
import Deposit from "../components/deposit/deposit";
import DepositHisotry from "../components/deposit/deposit.history";

const defTabs = {
	deposit: "lbl_Deposit",
	depositHistory: "lbl_DepositHistory"
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const [tab, setTab] = useState(defTabs.deposit);
	const handleTab = _tab => {
		if (tab !== _tab) {
			setTab(_tab);
		}
	};

	if (!userInfo.isLogin) {
		return <Redirect to="/" noThrow />;
	} else {
		let pageContent =
			tab === defTabs.depositHistory ? (
				<DepositHisotry />
			) : (
				props.children
			);
		return (
			<>
				<div className="tag">
					<button
						className={tab === defTabs.deposit ? "open" : ""}
						onClick={handleTab.bind(this, defTabs.deposit)}>
						{i18n.lbl_Deposit}
					</button>
					<button
						className={tab === defTabs.depositHistory ? "open" : ""}
						onClick={handleTab.bind(this, defTabs.depositHistory)}>
						{i18n.lbl_DepositHistory}
					</button>
				</div>
				{pageContent}
			</>
		);
	}
};

export default IndexPage;
