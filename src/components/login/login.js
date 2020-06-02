import React, { useState, useContext } from "react";
import Inputbox from "../common/inputbox";
import Checkbox from "../common/checkbox";
import logo from "../../styles/Nova88/img/logo.svg";
import { LOGIN, ONLINE_CHECK } from "../../service/auth";
import { api_GetTranslationData } from "../../service/api/site";
import { userInfoContext } from "../context/userInfo";
import { i18nContext } from "../context/i18n";
import { navContext, defPanel } from "../context/nav";
import { navigate } from "@reach/router";

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
			const callbackFunc = (
				errorCode,
				message,
				isLogin,
				userData,
				langId
			) => {
				if (errorCode === 0) {
					if (userInfo?.langId !== langId) {
						api_GetTranslationData(langId).then(res => {
							seti18n(res.data.data);
						});
					}

					setUserInfo(() => ({
						...userData,
						isLogin: isLogin,
						langId: langId
					}));

					const OnlineCheckCallBack = (errorCode, errMsg) => {
						if (errorCode !== 0) {
							setUserInfo(prevState => ({
								...prevState,
								isLogin: false
							}));

							if (errorCode !== 401) {
								alert(errMsg);
							}

							navigate("/");
						} else {
							setTimeout();
						}
					};

					ONLINE_CHECK(OnlineCheckCallBack);
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
					username: userValueState.UserName,
					password: userValueState.Password,
					isPersistent: userValueState.Checkbox
				},
				callbackFunc
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
			let newState = show ? null : defPanel.login;
			return newState;
		});
	};

	let showPanel = nav === defPanel.login;

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
					onFocus={showTipsHandler.bind(null, "UserName")}
					onBlur={checkValueHandler.bind(null, "UserName")}
					onChange={EditField.bind(null, "UserName")}
					ClassName="JoinRule"
					showTips={showTipsState.UserName}
					Warning={warningState.UserName}
					value={userValueState.UserName}
				/>

				<Inputbox
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					placeholder={i18n["lbl_Password"]}
					onFocus={showTipsHandler.bind(null, "Password")}
					onBlur={checkValueHandler.bind(null, "Password")}
					onChange={EditField.bind(null, "Password")}
					showPsw={pswState}
					showPswHandler={showPswHandler}
					ClassName="JoinRule"
					showTips={showTipsState.Password}
					Warning={warningState.Password}
					value={userValueState.Password}
				/>

				<Checkbox
					className="Terms"
					id="Login-RemeberPWD"
					Checked={checkboxState}
					checkboxHandler={checkboxHandler}>
					Remember Password
				</Checkbox>
				<button onClick={handleLogin}>{i18n["lbl_Login"]}</button>
			</div>
		</>
	);
};

export default LoginPage;
