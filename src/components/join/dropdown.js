import React from "react";

const Dropdown = props => {
	let arr = props.options.map((item, i) => {
		return (
			<Item
				key={i}
				value={i}
				displayText={item}
				selectState={props.selectState}
			/>
		);
	});

	return (
		<div
			className={`dropdown ${props.showTips ? "open" : ""}`}
			onClick={props.showTipsHandler.bind(null, props.colName)}>
			{props.options[props.selectedIdx]}
			<div
				className={`dropdown-container ${
					props.showTips ? "open" : ""
				}`}>
				{arr}
			</div>
		</div>
	);
};

const Item = props => {
	const HandleClick = e => {
		e.stopPropagation();
		props.selectState(props.value);
	};
	return (
		<div className="dropdown-item" onClick={HandleClick}>
			<span className="text">{props.displayText}</span>
		</div>
	);
};

export default Dropdown;
