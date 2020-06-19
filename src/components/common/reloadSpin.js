import React, { useState } from "react";

export default props => {
	const [spin, setSpin] = useState(false);

	const clickSpin = () => {
		setSpin(true);
		if (!spin) {
			props.func();
		}
		setTimeout(() => {
			setSpin(false);
		}, 1000);
	};

	return (
		<button
			className={`icon icon-spinner11 clickBtn${spin ? " open" : ""}`}
			onClick={clickSpin}></button>
	);
};
