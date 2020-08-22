import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { siteName, sites } from "../../config";
import Goal123Logo from "../../styles/Goal123/img/logo.png";

export default () => {
	const { i18n } = useContext(i18nContext);

	switch (siteName) {
		case sites.Goal123:
			return <Goal123Loading loadingDisplayText={i18n.lbl_Loading} />;

		case sites.Nova88:
			return <Nova88Loading loadingDisplayText={i18n.lbl_Loading} />;

		default:
			return <></>;
	}
};

const Nova88Loading = ({ loadingDisplayText }) => {
	return (
		<div id="Loading" className="open">
			<div className="container">
				<div className="cube">
					<div className="sides">
						<div className="top"></div>
						<div className="right"></div>
						<div className="bottom"></div>
						<div className="left"></div>
						<div className="front"></div>
						<div className="back"></div>
					</div>
				</div>
				<h1> </h1>
				<div className="text">{loadingDisplayText}...</div>
			</div>
		</div>
	);
};

const Goal123Loading = ({ loadingDisplayText }) => {
	return (
		<div id="Loading" className="open">
			<div className="container">
				<div>
					<div>
						<img src={Goal123Logo} alt="Goal123" />
					</div>
					<div>
						<img src={Goal123Logo} alt="Goal123" />
					</div>
					<div>
						<img src={Goal123Logo} alt="Goal123" />
					</div>
					<div>
						<img src={Goal123Logo} alt="Goal123" />
					</div>
				</div>
				<div className="text">{loadingDisplayText}...</div>
			</div>
		</div>
	);
};
