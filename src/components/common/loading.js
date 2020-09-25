import React, { useContext } from "react";
import { i18nContext } from "../common/context";

export default () => {
	const { i18n } = useContext(i18nContext);

	let loadingDisplayText = i18n.lbl_Loading;
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
