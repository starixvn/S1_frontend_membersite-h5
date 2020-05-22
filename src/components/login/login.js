import React, { useState } from "react";
import Inputbox from "./inputbox";
import Checkbox from "./checkbox";
import logo from "../../styles/Nova88/img/logo.svg";

const LoginPage = ({ ButtonTitle }) => {
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

	const [showPanel, handlePanel] = useState(false);
	const handleJoinPanel = () => {
		handlePanel(prevState => !prevState);
	};
	return (
		<>
			<button onClick={handleJoinPanel}>{ButtonTitle}</button>
			<div className={`Login${showPanel ? " open" : ""}`}>
				<div
					className={`close${showPanel ? " open" : ""}`}
					onClick={handleJoinPanel}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<img src={logo} alt="" />
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
				<button>LOGIN</button>
			</div>
		</>
	);
};

export default LoginPage;
