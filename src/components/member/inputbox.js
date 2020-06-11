import React from "react";

const Inputbox = props => {
	return (
		<div className="inputBox">
			<i className={`icon ${props.icon}`}></i>
			<input
				type={props.inputType}
				placeholder={props.placeholder}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onChange={props.onChange}
				value={props.value ? props.value : null}
				max={props.max ? props.max : null}
			/>
			<div className="icon-module">
				{props.Warning ? (
					<i
						className={`icon ${
							props.Warning.status ? "icon-warning" : ""
						}`}></i>
				) : null}
			</div>
			<div
				className={`${props.ClassName}${
					props.showTips ? " open" : ""
				}`}>
				{props.Tips}
			</div>
			{props.Warning ? (
				<div
					className={`${props.ClassName}${
						props.Warning.status ? " open" : ""
					}`}>
					{props.Warning.msg}
				</div>
			) : null}
		</div>
	);
};

export default Inputbox;
