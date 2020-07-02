import React, { useContext } from "react";
import { i18nContext } from "../common/context";

export default () => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<div className="step">
				<div className="stepLine">
					<div className="stepBar100"></div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark"></div>
					</div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark"></div>
					</div>
				</div>
			</div>
			<div className="icon icon-like"></div>
			<span className="text-center">
				{i18n.lbl_WaitKYC}
				<br />
				{i18n.lbl_WaitKYCHint}
			</span>
		</>
	);
};
