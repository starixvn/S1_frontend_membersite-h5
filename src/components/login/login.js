import React, { useState, useContext } from "react";
import Inputbox from "../common/inputbox";
import InputboxPWD from "../common/inputbox.password";
import logo from "../../styles/Nova88/img/logo.svg";
import { LOGIN } from "../../service/auth";
import { api_GetTranslationData } from "../../service/api/site";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel
} from "../common/context";

const initState = {
	UserName: "",
	Password: "",
	Checkbox: false
};

const initWarningState = {
	UserName: {
		status: false,
		msg: ""
	},
	Password: {
		status: false,
		msg: ""
	},
	Checkbox: {
		status: false,
		msg: ""
	}
};

const warningLangKey = {
	UserName: "msg_UsernameReq",
	Password: "msg_PasswordReq"
};

const LoginPage = ({ ButtonTitle }) => {
	const { i18n, seti18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const [userValueState, setUserValueState] = useState(initState);

	const checkValueHandler = (colName, e) => {
		let val = e.target.value;
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					...prevState[colName],
					status: val === "",
					msg: i18n[warningLangKey[colName]]
				}
			};
		});
	};

	const [pswState, setPswState] = useState(false);

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const [warningState, setWarningState] = useState(initWarningState);

	const [checkboxState, setCheckboxState] = useState(false);

	const checkboxHandler = () => {
		let checked = !checkboxState;
		setCheckboxState(checked);
		setUserValueState(prevState => {
			return { ...prevState, Checkbox: checked };
		});
	};

	const handleLogin = () => {
		let checked =
			userValueState.UserName !== "" && userValueState.Password !== "";

		setWarningState(prevState => {
			return {
				...prevState,
				UserName: {
					...prevState.UserName,
					status: userValueState.UserName === "",
					msg: i18n[warningLangKey.UserName]
				},
				Password: {
					...prevState.Password,
					status: userValueState.Password === "",
					msg: i18n[warningLangKey.Password]
				}
			};
		});

		if (checked) {
			const CallBackLogin = (errorCode, message, isLogin, userData) => {
				if (errorCode === 0) {
					let langId = userData.langId;
					if (userInfo?.langId !== langId) {
						api_GetTranslationData(langId).then(res => {
							seti18n(res.data.data);
						});
					}

					setUserInfo(() => ({
						...userData,
						isLogin: isLogin
					}));
					setNav(null);
				} else if (
					errorCode === 1101 ||
					errorCode === 1102 ||
					errorCode === 9000
				) {
					setWarningState(prevState => ({
						...prevState,
						UserName: { status: true, msg: message }
					}));
				} else if (errorCode === 1001) {
					setWarningState(prevState => ({
						...prevState,
						Password: { status: true, msg: message }
					}));
				}
			};

			LOGIN(
				{
					userName: userValueState.UserName,
					password: userValueState.Password
				},
				CallBackLogin
			);
		}
	};

	const { nav, setNav } = useContext(navContext);
	const handleloginPanel = (show, reset) => {
		if (reset) {
			setUserValueState(initState);
			setWarningState(initWarningState);
		}
		setNav(() => {
			let newState = show ? null : defNavPanel.login;
			return newState;
		});
	};

	let showPanel = nav === defNavPanel.login;

	const EditField = (colName, e) => {
		let value = e.target.value;
		setUserValueState(prevState => ({
			...prevState,
			[colName]: value
		}));
	};

	return (
		<>
			<button onClick={handleloginPanel.bind(this, showPanel)}>
				{ButtonTitle}
			</button>
			<div className={`Login${showPanel ? " open" : ""}`}>
				<div
					className={`close${showPanel ? " open" : ""}`}
					onClick={handleloginPanel.bind(this, showPanel, true)}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<img src={logo} alt="Nova88" />
				<div className="title">{i18n["lbl_Login"]}</div>

				<Inputbox
					icon="icon-member"
					inputType="text"
					placeholder={i18n["lbl_Username"]}
					onBlur={checkValueHandler.bind(null, "UserName")}
					onChange={EditField.bind(null, "UserName")}
					ClassName="JoinRule"
					Warning={warningState.UserName}
					value={userValueState.UserName}
				/>

				<InputboxPWD
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					placeholder={i18n["lbl_Password"]}
					onBlur={checkValueHandler.bind(null, "Password")}
					onChange={EditField.bind(null, "Password")}
					showPsw={pswState}
					showPswHandler={showPswHandler}
					ClassName="JoinRule"
					Warning={warningState.Password}
					value={userValueState.Password}
				/>

				<button onClick={handleLogin}>{i18n["lbl_Login"]}</button>
			</div>
		</>
	);
};

export default LoginPage;
