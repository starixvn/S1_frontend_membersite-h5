import React, { useState } from "react";
import Inputbox from "../common/inputbox";
import Checkbox from "../common/checkbox";
import logo from "../../styles/Nova88/img/logo.svg";

const LoginPage = ({ ButtonTitle, handleLogin }) => {
	// -----userValue-----
	const [userValueState, setUserValueState] = useState({
		UserName: "",
		Password: "",
		Checkbox: false
	});

	const usernameValueHandler = e => {
		let val = e.target.value;
		setUserValueState(prevState => {
			return { ...prevState, UserName: val };
		});

		if (val === "") {
			setWarningState(prevState => {
				return { ...prevState, UserName: true };
			});
		} else if (val !== "") {
			setWarningState(prevState => {
				return { ...prevState, UserName: false };
			});
		}
	};

	const passwordValueHandler = e => {
		let val = e.target.value;
		setUserValueState(prevState => {
			return { ...prevState, Password: val };
		});

		if (val === "") {
			setWarningState(prevState => {
				return { ...prevState, Password: true };
			});
		} else if (val !== "") {
			setWarningState(prevState => {
				return { ...prevState, Password: false };
			});
		}
	};

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
	const [pswState, setPswState] = useState(false);

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	// ---warning-----
	const [warningState, setWarningState] = useState({
		UserName: false,
		Password: false,
		Checkbox: false
	});

	// -----checkbox-----
	const [checkboxState, setCheckboxState] = useState(false);

	const checkboxHandler = () => {
		let checked = !checkboxState;
		setCheckboxState(checked);
		setUserValueState(prevState => {
			return { ...prevState, Checkbox: checked };
		});
	};

	// -----checkList-----
	const checklistHandler = () => {
		if (userValueState.UserName === "") {
			setWarningState(prevState => {
				return { ...prevState, UserName: true };
			});
		} else if (userValueState.UserName !== "") {
			setWarningState(prevState => {
				return { ...prevState, UserName: false };
			});
		}

		if (userValueState.Password === "") {
			setWarningState(prevState => {
				return { ...prevState, Password: true };
			});
		} else if (userValueState.Password !== "") {
			setWarningState(prevState => {
				return { ...prevState, Password: false };
			});
		}
	};

	// ----showPanel-----
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
				<div className="title">LOGIN</div>

				<Inputbox
					icon="icon-member"
					inputType="text"
					placeholder="UserName"
					onFocus={showTipsHandler}
					onBlur={usernameValueHandler}
					colName="UserName"
					warningState={warningState.UserName}
					ClassName="JoinRule"
					showTips={showTipsState.UserName}
					Warning="Please enter UserName"></Inputbox>

				<Inputbox
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					placeholder="PassWord"
					onFocus={showTipsHandler}
					onBlur={passwordValueHandler}
					colName="Password"
					showPsw={pswState}
					showPswHandler={showPswHandler}
					warningState={warningState.Password}
					ClassName="JoinRule"
					showTips={showTipsState.Password}
					Warning="Please enter Password"></Inputbox>

				<Checkbox
					className="Terms"
					id="c2"
					Checked={checkboxState}
					checkboxHandler={checkboxHandler}>
					Remember Password
				</Checkbox>
				<button onClick={checklistHandler}>LOGIN</button>
			</div>
		</>
	);
};

export default LoginPage;
