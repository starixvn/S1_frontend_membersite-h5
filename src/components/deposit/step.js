import React from "react";

const Panel = ({ step }) => {
	let processBar =
		step === 1 ? (
			<div></div>
		) : step === 2 ? (
			<div className="stepBar50"></div>
		) : (
			<div className="stepBar100"></div>
		);

	return (
		<div className="step">
			<div className="stepLine">{processBar}</div>
			<div className="circle">
				<div>
					<div className="icon icon-checkmark"></div>
				</div>
			</div>
			<div className={step >= 2 ? "icon icon-checkmark" : "circle"}>
				<div>
					<div>2</div>
				</div>
			</div>
			<div className={step >= 3 ? "icon icon-checkmark" : "circle"}>
				<div>
					<div>3</div>
				</div>
			</div>
		</div>
	);
};

export default Panel;
