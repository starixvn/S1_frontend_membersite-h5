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
				value={props.value}
			/>
			<div className="icon-module">
				<i
					className={`icon ${
						!props.showPsw ? "icon-eye-blocked" : "icon-eye"
					}`}
					onClick={props.showPswHandler}></i>
				<i
					className={`icon ${
						props.Warning.status ? "icon-warning" : ""
					}`}></i>
			</div>
			<div
				className={`${props.ClassName}${
					props.showTips ? " open" : ""
				}`}>
				{props.Tips}
			</div>
			<div
				className={`${props.ClassName}${
					props.Warning.status ? " open" : ""
				}`}>
				{props.Warning.msg}
			</div>
		</div>
	);
};

export default Inputbox;
