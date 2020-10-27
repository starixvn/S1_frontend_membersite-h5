import React, { useEffect, useState, useContext, useRef } from "react";
import Inputbox from "../common/inputbox";
import InputboxPWD from "../common/inputbox.password";
import Dropdown from "../common/dropdown";
import Checkbox from "../common/checkbox";
import Tips from "./tips";
import {
	api_ExistsUserName,
	api_ExistsEmail,
	// api_Register,
	api_Signup,
	api_GetSiteCurrencyList,
	api_GetBanner,
	api_ExistsPhoneNo
} from "../../service/api/site";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import { getUrlParameter } from "../common/common";
import { getCookie } from "../common/cookie";
import {
	userInfoContext,
	i18nContext,
	navContext,
	defNavPanel,
	popBoxContext
} from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import TandC from "../../service/t_and_c";
import { useMatch, Redirect } from "@reach/router";
import path from "../../path";
import config, { siteInfo } from "../../config";
import PromoPopup from "./join.promotion";
import { initValue, initStatus, currencyToAreacode } from "./join.def";
import areaCode from "../../datas/areaCode";
import { Iov_GetBlackBox } from "../common/iovation";

const defaultLangId = GET_LANG_ID();

const Join = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { nav, setNav } = useContext(navContext);
	const [userValue, setUserValue] = useState(initValue);
	const [siteCurrency, setSiteCurrencyState] = useState([]);
	const [status, setStatus] = useState(initStatus);
	const [pswState, setPswState] = useState(false);
	const [redirectPath, setRedirectPath] = useState(null);
	const [banner, setBanner] = useState([]);
	const [hideCurrency, setHideCurrency] = useState(false);
	const [affiliateidExist, setAffiliateidExist] = useState("");
	const [defaultOption, setDefaultOption] = useState(
		i18n.lbl_PrefferedCurrency
	);

	const [promoPopup, setPromoPopup] = useState(false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		let refId = getCookie("RefId");
		let showBylink = window.location.pathname === `/${path.join.root}`;
		let openPanel = showBylink || nav === defNavPanel.join;
		if (refId && openPanel) {
			api_GetBanner("Promotion", refId, userInfo.langId).then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					if (res.data.data.length > 0) {
						setBanner(res.data.data);
						setPromoPopup(true);
					}
				}
			});
		}
	}, [nav, userInfo.langId]);

	useEffect(() => {
		let AffId = getUrlParameter("AffId") || getCookie("AffId");
		let affiliateid =
			getUrlParameter("affiliateid") || getCookie("affiliateid");

		if (AffId && isMountedRef) {
			setHideCurrency(true);
		} else if (affiliateid && isMountedRef) {
			setAffiliateidExist(affiliateid);
		}
	}, []);

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		api_GetSiteCurrencyList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const currencyNum = res.data.data;
						let currencyArr = currencyNum.map(id => {
							return { id: id, displayKey: `Currency_${id}` };
						});
						setSiteCurrencyState(() => currencyArr);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	}, [i18n.lbl_ImportantNote, i18n.msg_ApiServerError, setPopBox]);

	let _currencyId = siteCurrency[userValue.Currency]?.id;

	let currencyToCountryCode = _currencyId
		? currencyToAreacode[_currencyId]
		: null;

	const _areaCode =
		currencyToCountryCode !== null
			? areaCode[currencyToCountryCode]?.AreaCode
			: null;

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const showOnFocusTip = col => {
		let checked = status[col].checked;
		let msg = "";

		if (col === "UserName") {
			msg = "lbl_UsernameTooltip";
		} else if (col === "Password") {
			msg = "lbl_PasswordTooltip";
		} else if (col === "Email") {
			msg = "lbl_EmailToolTip";
		} else if (col === "AffiliateId") {
			msg = `lbl_Please_enter_Affiliate_ID`;
		} else if (col === "Phone") {
			msg = "lbl_PhoneTooltip";
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: checked,
				msg: i18n[msg]
			}
		}));
	};

	const checkValue = async (col, e) => {
		let val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "UserName") {
			let result = await usernameCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Password") {
			let result = passwordCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Email") {
			let result = await emailCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Currency") {
			let result = currencyCheck();
			checked = result.checked;
			msg = result.msg;
		} else if (col === "Phone") {
			let result = await phoneCheck(val);
			checked = result.checked;
			msg = result.msg;
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: checked,
				msg: i18n[msg]
			}
		}));
	};

	const usernameCheck = async val => {
		let checked = true;
		let msg = "";

		if (!val) {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = "msg_UsernameLength";
		} else {
			const res = await api_ExistsUserName({ UserName: val });

			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = "msg_UsernameNotAvailable";
			}
		}

		return { checked, msg };
	};

	const passwordCheck = val => {
		let checked = true;
		let msg = "";
		const regx = /^[a-zA-Z0-9@$*!%#?&]*$/;

		if (!val) {
			checked = false;
			msg = "msg_PasswordReq";
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = "msg_PasswordLength";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "msg_PasswordVaildate";
		}

		return { checked, msg };
	};

	const emailCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (!val || !regx.test(val)) {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else {
			const res = await api_ExistsEmail({ Email: val });
			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = "msg_MailExisted";
			}
		}

		return { checked, msg };
	};

	const phoneCheck = async val => {
		let checked = true;
		let msg = "";
		const regx = /^[0-9\s]*$/;

		if (!val) {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "lbl_PhoneTooltip";
		} else {
			const res = await api_ExistsPhoneNo({
				AreaCode: _areaCode,
				Phone: val
			});

			if (res.data.errorCode === 0 && res.data.data === true) {
				checked = false;
				msg = "msg_PhoneExisted";
			}
		}

		return { checked, msg };
	};

	const currencyCheck = () => {
		let checked = true;
		let msg = "";

		if (defaultOption !== null) {
			checked = false;
			msg = "lbl_RemindPrefferedCurrency";
		}

		return { checked, msg };
	};

	const onSelectItem = i => {
		setDefaultOption(null);

		setUserValue(prev => {
			return { ...prev, Currency: i };
		});
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setUserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const checkboxHandler = () => {
		let checked = !userValue.Checkbox;
		setUserValue(prevState => ({
			...prevState,
			Checkbox: checked
		}));
	};

	const checkAll = async () => {
		return await Promise.all([
			usernameCheck(userValue.UserName),
			phoneCheck(userValue.Phone),
			emailCheck(userValue.Email)
		]).then(
			res => {
				let _usernameCheck = res[0];
				let _phoneCheck = res[1];
				let _emailCheck = res[2];
				let _passwordCheck = passwordCheck(userValue.Password);
				let _currencyCheck = currencyCheck();
				let _checkboxCheck = userValue.Checkbox;

				let checked =
					_usernameCheck.checked &&
					_passwordCheck.checked &&
					_phoneCheck.checked &&
					_emailCheck.checked &&
					_currencyCheck.checked &&
					_checkboxCheck;

				if (!checked) {
					let checkboxMsg = "";
					if (!_checkboxCheck) {
						checkboxMsg = "lbl_Check18TCTooltip";
					}
					setStatus(prev => ({
						...prev,
						UserName: {
							checked: _usernameCheck.checked,
							msg: i18n[_usernameCheck.msg]
						},
						Password: {
							checked: _passwordCheck.checked,
							msg: i18n[_passwordCheck.msg]
						},
						Phone: {
							checked: _phoneCheck.checked,
							msg: i18n[_phoneCheck.msg]
						},
						Email: {
							checked: _emailCheck.checked,
							msg: i18n[_emailCheck.msg]
						},
						Currency: {
							checked: _currencyCheck.checked,
							msg: i18n[_currencyCheck.msg]
						},
						Checkbox: {
							checked: _checkboxCheck,
							msg: i18n[checkboxMsg]
						}
					}));
				}
				return checked;
			},
			err => {
				return false;
			}
		);
	};

	const clickSubmit = async () => {
		let checked = await checkAll();

		if (checked) {
			let regData = {
				UserName: userValue.UserName,
				Userpwd: userValue.Password,
				Email: userValue.Email,
				PhoneNo: userValue.Phone,
				CurrencyId: _currencyId,
				UserLang: defaultLangId,
				AreaCode: _areaCode
			};

			regData["RefId"] = getUrlParameter("RefId") || getCookie("RefId");
			regData["AffId"] = getUrlParameter("AffId") || getCookie("AffId");
			regData["Aff"] = getUrlParameter("Aff") || getCookie("Aff");
			regData["affiliateid"] =
				getUrlParameter("affiliateid") || getCookie("affiliateid");
			regData["blackbox"] = await Iov_GetBlackBox();

			api_Signup(regData, defaultLangId).then(
				response => {
					if (isMountedRef.current) {
						const errorCode = response.data.errorCode;
						const message = response.data.message;
						if (errorCode === 0) {
							api_GetCustProfile().then(
								res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: defaultLangId,
											userName: userValue.UserName
										};
										if (res_custInfo.data.errorCode === 0) {
											_user = {
												..._user,
												...res_custInfo.data.data
											};
										}
										setUserInfo(_user);
									}
								},
								err => {
									if (isMountedRef.current) {
										setPopBox({
											isOpen: true,
											title: i18n.lbl_ImportantNote,
											content: i18n.msg_ApiServerError
										});
									}
								}
							);
							setNav(null);
						} else if (
							errorCode === -2 ||
							errorCode === -5 ||
							errorCode === -19
						) {
							setStatus(prevState => ({
								...prevState,
								UserName: { status: true, msg: message }
							}));
						} else if (errorCode === -3) {
							setStatus(prevState => ({
								...prevState,
								Password: { status: true, msg: message }
							}));
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	};

	const handleJoinPanel = (show, reset, showBylink) => {
		if (reset) {
			setUserValue(initValue);
			setStatus(initStatus);
			setDefaultOption(i18n.lbl_PrefferedCurrency);
		}

		if (showBylink) {
			setRedirectPath("/");
		} else {
			setNav(() => {
				let newState = show ? null : defNavPanel.join;
				return newState;
			});
		}
	};

	let showBylink = useMatch(path.join.root);
	let openPanel = showBylink || nav === defNavPanel.join;

	const ClosePromoPopup = () => {
		setPromoPopup(false);
	};

	return redirectPath === null ? (
		<>
			<button onClick={handleJoinPanel.bind(this, openPanel)}>
				{i18n.lbl_JoinNow}
			</button>
			<div className={`Join${openPanel ? " open" : ""}`}>
				<div
					className={`close${openPanel ? " open" : ""}`}
					onClick={handleJoinPanel.bind(
						this,
						openPanel,
						true,
						showBylink
					)}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<img src={siteInfo().logo} alt={config.siteName} />
				<div className="title">{i18n.lbl_JoinNow}</div>

				<Inputbox
					icon="icon-member"
					ClassName="JoinRule"
					placeholder={i18n["lbl_Username"]}
					value={userValue.UserName}
					onFocus={showOnFocusTip.bind(null, "UserName")}
					onBlur={checkValue.bind(null, "UserName")}
					onChange={EditField.bind(null, "UserName")}
					checked={status.UserName.checked}
					tip={status.UserName.msg}></Inputbox>

				<InputboxPWD
					icon="icon-key"
					inputType={`${!pswState ? "password" : "text"}`}
					ClassName="JoinRule"
					showPsw={pswState}
					placeholder={i18n["lbl_Password"]}
					value={userValue.Password}
					onFocus={showOnFocusTip.bind(null, "Password")}
					onBlur={checkValue.bind(null, "Password")}
					onChange={EditField.bind(null, "Password")}
					showPswHandler={showPswHandler}
					checked={status.Password.checked}
					tip={status.Password.msg}></InputboxPWD>

				<Inputbox
					icon="icon-email"
					ClassName="JoinRule"
					placeholder={i18n["lbl_Email"]}
					value={userValue.Email}
					onFocus={showOnFocusTip.bind(null, "Email")}
					onBlur={checkValue.bind(null, "Email")}
					onChange={EditField.bind(null, "Email")}
					checked={status.Email.checked}
					tip={status.Email.msg}></Inputbox>

				{hideCurrency ? null : (
					<>
						<div
							className="inputBox"
							onBlur={checkValue.bind(null, "Currency")}>
							<Dropdown
								mainKey="join-curr"
								colName="Currency"
								defaultOption={defaultOption}
								selectedIdx={userValue.Currency}
								options={siteCurrency}
								onSelectItem={onSelectItem}
								i18n={i18n}></Dropdown>
							<Tips
								Icon="icon-coin-dollar"
								IsOpen={defaultOption !== null}
								ClassName="JoinRule">
								{status.Currency.msg}
							</Tips>
						</div>
						<Tips IsOpen={true} ClassName="JoinRule">
							{i18n["lbl_PreferredCurrencyToolTip"]}
						</Tips>
					</>
				)}

				{userValue.Currency !== null ? (
					<div className="inputBox parts">
						<span className="countryCode">{_areaCode}</span>
						<Inputbox
							icon="icon-phone"
							ClassName="JoinRule"
							placeholder={i18n["lbl_Phone"]}
							value={userValue.Phone}
							areaCode={_areaCode}
							onFocus={showOnFocusTip.bind(null, "Phone")}
							onBlur={checkValue.bind(null, "Phone")}
							onChange={EditField.bind(null, "Phone")}
							checked={status.Phone.checked}></Inputbox>
						<div
							className={`errortip${
								status.Phone.checked ? "" : " open"
							}`}>
							{status.Phone.msg}
						</div>
					</div>
				) : (
					<></>
				)}

				<Inputbox
					icon="icon-affiliate"
					ClassName="JoinRule"
					placeholder={i18n["lbl_Affiliate_ID"]}
					value={affiliateidExist ?? userValue.AffiliateId}
					onFocus={showOnFocusTip.bind(null, "AffiliateId")}
					onChange={EditField.bind(null, "AffiliateId")}
					checked={status.AffiliateId.checked}
					tip={status.AffiliateId.msg}
					disabled={affiliateidExist}></Inputbox>

				<Checkbox
					Checked={userValue.Checkbox}
					className={`Terms${
						status.Checkbox.checked === false ? " error" : ""
					}`}
					checkboxHandler={checkboxHandler}
					id="c1">
					{i18n["lbl_Check18TC1"]} &nbsp;
					<a target="_blank" href={TandC(userInfo.langId).terms}>
						{i18n["lbl_TermsConditions"]}
					</a>
					&nbsp; {i18n["lbl_Check18TC2"]}&nbsp;
					<a target="_blank" href={TandC(userInfo.langId).rule}>
						{i18n["lbl_RuleRegulations"]}
					</a>
					&nbsp; {i18n["lbl_Check18TC3"]}&nbsp;{config.siteName}
					.&nbsp;
					{i18n["lbl_Check18TC4"]}
				</Checkbox>
				{status.Checkbox.checked === false ? (
					<div className="JoinRule open">
						{i18n.lbl_Check18TCTooltip}
					</div>
				) : null}
				<div className="btn-group">
					<button onClick={clickSubmit}>{i18n["lbl_JoinNow"]}</button>
				</div>
			</div>

			<PromoPopup
				banner={banner}
				ImgFolder="Promotion"
				ClickClose={ClosePromoPopup}
				title={i18n.lbl_Welcome}
				isOpen={promoPopup}
			/>
		</>
	) : (
		<Redirect to="/" noThrow />
	);
};

export default Join;
