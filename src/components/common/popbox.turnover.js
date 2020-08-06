import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import { number_format } from "../common/common";

export default ({ currencyId, turnover, rollover, func_ClickOK }) => {
	const { i18n } = useContext(i18nContext);
	let currency = i18n[`Currency-${currencyId}`];
	let percentage =
		turnover > rollover ? 100 : Math.round((turnover / rollover) * 100);

	return (
		<div className="popTxt">
			<div className="account">
				<div className="info">{i18n.lbl_TurnoverAccmulateHint}</div>
				<div className="progressBarModule">
					<div className="bounsName">
						{i18n.lbl_TurnoverAccumulated}
					</div>
					<div className="turnover">
						<span>
							{currency} ${number_format(turnover)}
						</span>{" "}
						/ (
						{`${i18n.lbl_Req}. ${currency} ${number_format(
							rollover
						)}`}
						)
					</div>
					<div className="progressBar">
						<div className="bar">
							<div
								className="progress"
								style={{ width: `${percentage}%` }}></div>
						</div>
						<div className="percentage">`${percentage}%`</div>
					</div>
				</div>
			</div>
			<div className="btn-group">
				<button className="orange" onClick={func_ClickOK}>
					{i18n["lbl_OK"]}
				</button>
			</div>
		</div>
	);
};
