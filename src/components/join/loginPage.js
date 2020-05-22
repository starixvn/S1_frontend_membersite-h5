import React, { useState } from "react";
import Inputbox from "./inputbox";
import Checkbox from "./checkbox";
import Joinbtn from "./joinbtn";

const LoginPage = () => {
	let showPsw = false;

	// -----showTips-----
	const [showTipsState, setShowTipsState] = useState({
		UserName: false,
		Password: false
	});

	const showTipsHandler = (col, e) => {
		e.stopPropagation();
		setShowTipsState(prevState => {
			Object.keys(prevState).forEach(_col => {
				prevState[_col] = _col === col;
			});
			return {
				...prevState
			};
		});
	};

	// -----showPsw-----
	const showPswHandler = () => {
		showPsw = !showPsw;
		console.log(showPsw);
	};

	// ---warning-----
	const [warningState, setWarningState] = useState({
		UserName: false,
		Password: false,
		Checkbox: false
	});

	return (
		<div className="Join open">
			<div className="close open">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<img src="./img/logo.svg" alt="" />
			<div className="title">JOIN NOW</div>

			<Inputbox
				icon="icon-member"
				inputType="text"
				placeholder="UserName"
				onFocus={showTipsHandler}
				colName="UserName"
				warningState={warningState.UserName}
				ClassName="JoinRule"
				showTips={showTipsState.UserName}
				Warning="Invalid UserName"></Inputbox>

			<Inputbox
				icon="icon-key"
				inputType={`${!showPsw ? "password" : "text"}`}
				placeholder="PassWord"
				onFocus={showTipsHandler}
				colName="Password"
				showPsw={showPsw}
				showPswHandler={showPswHandler}
				warningState={warningState.Password}
				ClassName="JoinRule"
				showTips={showTipsState.Password}
				Warning="Invalid Password"></Inputbox>

			<Checkbox>Remember Password</Checkbox>
			<Joinbtn />
		</div>
	);
};

export default LoginPage;
