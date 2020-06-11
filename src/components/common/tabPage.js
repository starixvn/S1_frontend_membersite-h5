import React, { useContext, useState } from "react";
import { Redirect, Link } from "@reach/router";
import { i18nContext, userInfoContext } from "./context";

const IndexPage = ({ defTabs, children }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [tabKey, setTab] = useState("default");
	const handleTab = _tabKey => {
		if (tabKey !== _tabKey) {
			setTab(_tabKey);
		}
	};

	if (!userInfo.isLogin) {
		return <Redirect to="/" noThrow />;
	} else {
		let items = Object.keys(defTabs).map(key => {
			let tabItem = defTabs[key];
			return (
				<Link
					to={tabItem.to}
					key={`tab-btn-${key}`}
					className={tabKey === key ? "open" : ""}
					onClick={handleTab.bind(null, key)}>
					{i18n[tabItem.displayKey]}
				</Link>
			);
		});

		return (
			<>
				<div className="tag">{items}</div>
				{children}
			</>
		);
	}
};

export default IndexPage;
