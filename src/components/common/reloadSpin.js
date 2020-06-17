import React, { useState } from "react";

export default props => {
	const [spin, setSpin] = useState(false);

	const clickSpin = () => {
		setSpin(true);
		setTimeout(() => {
			setSpin(false);
		}, 1000);
		props.func();
	};

	return (
		<button
			className={`icon icon-spinner11 clickBtn${spin ? " open" : ""}`}
			onClick={clickSpin}></button>
	);
};
