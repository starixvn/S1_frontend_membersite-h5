import React, { useContext } from "react";
import { Redirect, Link, useMatch } from "@reach/router";
import { i18nContext, userInfoContext } from "./context";

const IndexPage = ({ defTabs, children }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const CheckMatch = path => {
		return useMatch(path) !== null;
	};

	if (!userInfo.isLogin) {
		return <Redirect to="/" noThrow />;
	} else {
		let items = Object.keys(defTabs).map(key => {
			let tabItem = defTabs[key];
			let match =
				CheckMatch(`${tabItem.to}/*`) &&
				(!tabItem.excludeMath ||
					!CheckMatch(`${tabItem.excludeMath}/*`));

			return (
				<Link
					to={tabItem.to}
					key={`tab-btn-${key}`}
					className={match ? "open" : ""}>
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
