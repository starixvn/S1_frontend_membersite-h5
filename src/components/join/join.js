import React, { useEffect, useState, useContext } from "react";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/checkbox";
import Tips from "./tips";
import logo from "../../styles/Nova88/img/logo.svg";
import { api_ExistsUserName } from "../../service/api/site";
import { api_ExistsEmail } from "../../service/api/site";
import { api_Register } from "../../service/api/site";
import { api_GetSiteCurrencyList } from "../../service/api/site";
import { getUrlParameter } from "../common/common";
import { getCookie } from "../common/cookie";
import { userInfoContext } from "../context/userInfo";
import { i18nContext } from "../context/i18n";
import { navContext, defPanel } from "../context/nav";
import { GetLangId } from "../../service/language";
import TandC from "../../service//t_and_c";

const colName = ["UserName", "Password", "Email", "Currency"];

const initState = {
	UserName: "",
	Password: "",
	Email: "",
	Currency: null,
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
	Email: {
		status: false,
		msg: ""
	},
	Currency: {
		status: false
	},
	Checkbox: {
		status: false
	}
};

const defaultLangId = GetLangId();
const currencyDefaultSelectIdx = 0;

function Join() {
	const { i18n } = useContext(i18nContext);
	const { setUserInfo } = useContext(userInfoContext);

	const [userValueState, setUserValueState] = useState(initState);
	const [siteCurrencyState, setSiteCurrencyState] = useState([]);
	const [warningState, setWarningState] = useState(initWarningState);
	const [pswState, setPswState] = useState(false);
	const [checkboxState, setCheckboxState] = useState(false);

	const [showTipsState, setShowTipsState] = useState({
		UserName: false,
		Password: false,
		Email: false,
		Currency: false
	});

	const [checklistState, setChecklistState] = useState({
		UserName: false,
		Password: false,
		Email: false,
		Checkbox: false
	});

	useEffect(() => {
		api_GetSiteCurrencyList().then(res => {
			const currencyNum = res.data.data;
			let currencyArr = currencyNum.map(id => {
				return { id: id, displayText: i18n[`Currency_${id}`] };
			});

			setUserValueState(prevState => ({
				...prevState,
				Currency: currencyArr[currencyDefaultSelectIdx]
			}));
			setSiteCurrencyState(prevS => currencyArr);
		});
	}, [i18n]);

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const showTipsHandler = col => {
		if (warningState[col].status === true) {
			setShowTipsState(prevState => {
				Object.keys(prevState).forEach(_col => {
					prevState[_col] = false;
				});
				return {
					...prevState
				};
			});
		} else {
			setShowTipsState(prevState => {
				Object.keys(prevState).forEach(_col => {
					prevState[_col] = _col === col;
				});
				return {
					...prevState
				};
			});
		}
	};

	const usernameCheck = val => {
		let checked = false;
		let message = "";
		if (val === "") {
			checked = false;
			message = i18n["msg_UsernameReq"];
		} else if (val != null) {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				message = i18n["msg_UsernameLength"];
			} else {
				checked = true;
			}
		}

		return { checked, message };
	};

	const checkUsernameHandler = (colName, e) => {
		const val = e.target.value;
		let result = usernameCheck(val);

		api_ExistsUserName({
			UserName: val
		}).then(response => {
			const res = response.data;
			if (res.errorCode === 0 && res.data === true) {
				setWarningState(prevState => {
					return {
						...prevState,
						UserName: {
							status: true,
							msg: i18n["msg_UsernameNotAvailable"]
						}
					};
				});
			}
		});

		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					status: !result.checked,
					msg: result.message
				}
			};
		});
		setShowTipsState(prevState => {
			return { ...prevState, UserName: false };
		});
		setUserValueState(prevState => {
			return { ...prevState, UserName: val };
		});
		setChecklistState(prevState => {
			return { ...prevState, UserName: true };
		});
	};

	const passwordCheck = val => {
		let checked = false;
		let message = "";

		const regx = /^[a-zA-Z0-9@$*!%#?&]*$/;
		if (val === "") {
			checked = false;
			message = i18n["msg_PasswordReq"];
		} else if (val != null) {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				message = i18n["msg_PasswordLength"];
			} else if (!regx.test(val)) {
				checked = false;
				message = i18n["msg_PasswordVaildate"];
			} else {
				checked = true;
			}
		}
		return { checked, message };
	};

	const checkPasswordHandler = (colName, e) => {
		const val = e.target.value;

		let result = passwordCheck(val);
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					status: !result.checked,
					msg: result.message
				}
			};
		});
		setShowTipsState(prevState => {
			return { ...prevState, Password: false };
		});
		setUserValueState(prevState => {
			return { ...prevState, Password: val };
		});
		setChecklistState(prevState => {
			return { ...prevState, Password: result.checked };
		});
	};

	const emailCheck = val => {
		let checked = false;
		let message = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			message = i18n["msg_MailWrongFormat"];
		} else if (val != null) {
			if (!regx.test(val)) {
				checked = false;
				message = i18n["msg_MailWrongFormat"];
			} else {
				checked = true;
			}
		}

		return { checked, message };
	};

	const checkEmailHandler = (colName, e) => {
		const val = e.target.value;

		let result = emailCheck(val);

		api_ExistsEmail({
			Email: val
		}).then(response => {
			const res = response.data;
			if (res.errorCode === 0 && res.data === true) {
				setWarningState(prevState => {
					return {
						...prevState,
						Email: {
							status: true,
							msg: i18n["msg_MailExisted"]
						}
					};
				});
			}
		});
		setWarningState(prevState => {
			return {
				...prevState,
				[colName]: {
					status: !result.checked,
					msg: i18n["msg_MailWrongFormat"]
				}
			};
		});
		setChecklistState(prevState => {
			return { ...prevState, Email: result.checked };
		});
		setShowTipsState(prevState => {
			return { ...prevState, Email: false };
		});
		setUserValueState(prevState => {
			return { ...prevState, Email: val };
		});
	};

	const [currencyState, setcurrencyState] = useState(
		currencyDefaultSelectIdx
	);

	const dropdownStateHandler = i => {
		setcurrencyState(i);
		setShowTipsState(prevState => {
			return { ...prevState, Currency: false };
		});
		setUserValueState(prevState => {
			return { ...prevState, Currency: siteCurrencyState[i] };
		});
	};

	const EditField = (colName, e) => {
		let val = e.target.value;
		setUserValueState(prevState => ({
			...prevState,
			[colName]: val
		}));
	};

	const checkboxHandler = () => {
		let checked = !checkboxState;
		setCheckboxState(checked);
		setChecklistState(prevState => {
			return { ...prevState, Checkbox: checked };
		});
	};

	const checklistHandler = () => {
		let checked = true;

		let UserName = usernameCheck(userValueState.UserName);
		let Password = passwordCheck(userValueState.Password);
		let Email = emailCheck(userValueState.Email);

		checked = UserName.checked && Password.checked && Email.checked;

		for (let i in checklistState) {
			if (checklistState[i] === false) {
				checked = false;
				setWarningState(prevState => {
					return {
						...prevState,
						[i]: {
							status: true,
							msg: i.message
						}
					};
				});
			}
		}

		if (checked) {
			let regData = {
				UserName: userValueState.UserName,
				Userpwd: userValueState.Password,
				Email: userValueState.Email,
				CurrencyId: userValueState.Currency.id,
				UserLang: defaultLangId
			};

			regData["refId"] = getUrlParameter("refId") || getCookie("refId");

			regData["affId"] = getUrlParameter("affId") || getCookie("affId");

			regData["aff"] = getUrlParameter("aff");

			api_Register(regData).then(response => {
				const errorCode = response.data.errorCode;
				const message = response.data.message;
				if (errorCode === 0) {
					setUserInfo(() => ({
						isLogin: true,
						langCode: defaultLangId,
						username: userValueState.UserName
					}));
					setNav(null);
				} else if (
					errorCode === -2 ||
					errorCode === -5 ||
					errorCode === -19
				) {
					setWarningState(prevState => ({
						...prevState,
						UserName: { status: true, msg: message }
					}));
				} else if (errorCode === -3) {
					setWarningState(prevState => ({
						...prevState,
						Password: { status: true, msg: message }
					}));
				}
			});
		} else {
			setWarningState(prevState => ({
				...prevState,
				UserName: { status: !UserName.checked, msg: UserName.message },
				Password: { status: !Password.checked, msg: Password.message },
				Email: { status: !Email.checked, msg: Email.message }
			}));
		}
	};

	const { nav, setNav } = useContext(navContext);
	const handleJoinPanel = (show, reset) => {
		if (reset) {
			setUserValueState({
				...initState,
				Currency: siteCurrencyState[currencyDefaultSelectIdx]
			});
			setWarningState(initWarningState);
			setcurrencyState(currencyDefaultSelectIdx);
			setCheckboxState(false);
		}

		setNav(() => {
			let newState = show ? null : defPanel.join;
			return newState;
		});
	};

	let openPanel = nav === defPanel.join;

	return (
		<>
			<button onClick={handleJoinPanel.bind(this, openPanel)}>
				JOIN
			</button>
			<div className={`Join${openPanel ? " open" : ""}`}>
				<div
					className={`close${openPanel ? " open" : ""}`}
					onClick={handleJoinPanel.bind(this, openPanel, true)}>
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
					placeholder={i18n["lbl_Username"]}
					onFocus={showTipsHandler.bind(null, "UserName")}
					onBlur={checkUsernameHandler.bind(null, "UserName")}
					onChange={EditField.bind(null, "UserName")}
					ClassName="JoinRule"
					showTips={showTipsState.UserName}
					Tips={i18n["lbl_UsernameTooltip"]}
					Warning={warningState.UserName}
					value={userValueState.UserName}></Inputbox>

				<Inputbox
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					placeholder={i18n["lbl_Password"]}
					onFocus={showTipsHandler.bind(null, "Password")}
					onBlur={checkPasswordHandler.bind(null, "Password")}
					onChange={EditField.bind(null, "Password")}
					showPsw={pswState}
					showPswHandler={showPswHandler}
					ClassName="JoinRule"
					showTips={showTipsState.Password}
					Tips={i18n["lbl_PasswordTooltip"]}
					Warning={warningState.Password}
					value={userValueState.Password}></Inputbox>

				<Inputbox
					icon="icon-email"
					inputType="text"
					placeholder={i18n["lbl_Email"]}
					onFocus={showTipsHandler.bind(null, "Email")}
					onBlur={checkEmailHandler.bind(null, "Email")}
					onChange={EditField.bind(null, "Email")}
					ClassName="JoinRule"
					showTips={showTipsState.Email}
					Tips={i18n["lbl_EmailToolTip"]}
					Warning={warningState.Email}
					value={userValueState.Email}></Inputbox>

				{/* {getUrlParameter("affId") === "" && getCookie("affId") === ""
					? true
					: null( */}
				<div className="inputBox">
					<Dropdown
						mainKey="join-curr"
						colName={colName[3]}
						selectedIdx={currencyState}
						options={siteCurrencyState}
						clickDropdown={showTipsHandler}
						onSelectItem={dropdownStateHandler}
						value={userValueState.Currency}></Dropdown>
					<Tips
						Icon="icon-coin-dollar"
						IsOpen={showTipsState.Currency}
						ClassName="JoinRule">
						{i18n["lbl_PreferredCurrencyToolTip"]}
					</Tips>
				</div>
				{/* )} */}

				<Checkbox
					Checked={checkboxState}
					className="Terms"
					checkboxHandler={checkboxHandler}
					id="c1">
					{i18n["lbl_Check18TC1"]} &nbsp;
					<a target="_blank" href={TandC.terms}>
						{i18n["lbl_TermsConditions"]}
					</a>
					&nbsp; {i18n["lbl_Check18TC2"]}&nbsp;
					<a target="_blank" href={TandC.rule}>
						{i18n["lbl_RuleRegulations"]}
					</a>
					&nbsp; {i18n["lbl_Check18TC3"]}&nbsp;Nova88.&nbsp;
					{i18n["lbl_Check18TC4"]}
				</Checkbox>

				<button onClick={checklistHandler}>
					{i18n["lbl_JoinNow"]}
				</button>
			</div>
		</>
	);
}

export default Join;
