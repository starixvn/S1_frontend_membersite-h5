import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "@reach/router";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown.icon";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import areaCode from "../../datas/areaCode";
import moment from "moment";
import {
	api_SetProfile,
	api_GetCustProfile
} from "../../service/api/accountStrict";
import { api_ExistsPhoneNo } from "../../service/api/site";
import path from "../../path";
import { monthOptions, initStatus, initValue } from "./profile.def";
import { defPopBoxType } from "../common/popbox";
import { redirectToPrev } from "./profile.redirect";

const Panel = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState(initValue);
	const [status, setStatus] = useState(initStatus);
	const [yearSelectedIdx, setYearSelectedIdx] = useState();
	const [monthSelectedIdx, setMonthSelectedIdx] = useState();
	const [daySelectedIdx, setDaySelectedIdx] = useState();

	const country =
		userInfo.country && userInfo.country !== "null"
			? userInfo.country
			: userInfo.perCountry;
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(`/${path.member.root}`);
		}
	}, [redirectPath]);

	let _areaCode = country ? areaCode[country].AreaCode : "";
	let infoList = [
		{
			infoTitle: "accountName",
			colTitle: i18n["lbl_RealName"],
			content: userInfo.accountName
		},
		{
			infoTitle: "birth",
			colTitle: i18n["lbl_Birthday"],
			content: `${userInfo.birth_m}/${userInfo.birth_d}/${userInfo.birth_y}`,
			birth_d: userInfo.birth_d,
			birth_m: userInfo.birth_m,
			birth_y: userInfo.birth_y
		},
		{
			infoTitle: "phoneNo",
			colTitle: i18n["lbl_Phone"],
			content: `(${_areaCode})${userInfo.phoneNo}`,
			isVerified: userInfo.phoneVerified
		},
		{
			infoTitle: "userName",
			colTitle: i18n["lbl_Username"],
			content: userInfo.userName
		},
		{
			infoTitle:
				userInfo.country && userInfo.country !== "null"
					? "country"
					: "perCountry",
			colTitle: i18n["lbl_Country"],
			content:
				userInfo.country && userInfo.country !== "null"
					? i18n[`lbl_Country${userInfo.country}`]
					: i18n[`lbl_Country${userInfo.perCountry}`]
		},
		{
			infoTitle: "email",
			colTitle: i18n["lbl_Email"],
			content: userInfo.email
		},
		{
			infoTitle: "regTime",
			colTitle: i18n["lbl_RegisterTime"],
			content: date_format(userInfo.regTime)
		},
		{
			infoTitle: "lastLogin",
			colTitle: i18n["lbl_LastLogin"],
			content: date_format(userInfo.lastLogin)
		}
	];

	let yearOptions = [];
	let dateOptions = [];

	let startYear = GetYear();
	let month =
		monthSelectedIdx === undefined
			? ""
			: monthOptions[monthSelectedIdx].value;

	let _startYear = startYear - 59;
	for (let i = startYear; i >= _startYear; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	let year =
		yearSelectedIdx === undefined ? "" : yearOptions[yearSelectedIdx].value;

	let days = GetDayOfMonth(year, month);
	for (let i = 1; i <= days; i++) {
		dateOptions.push({ value: i, id: i, displayText: i });
	}

	const dropdownStateHandler = (col, i) => {
		if (col === "bday_year") {
			setYearSelectedIdx(i);
		} else if (col === "bday_month") {
			setMonthSelectedIdx(i);
		} else {
			setDaySelectedIdx(i);
		}
	};

	const checkAccountName = val => {
		let checked = !!val;
		let message = !val ? i18n["msg_EnterRealName"] : "";

		setStatus(prevState => ({
			...prevState,
			accountName: {
				checked: checked,
				msg: message
			}
		}));

		return checked;
	};

	const checkPhone = val => {
		let checked = true;
		let tip = "";

		if (!val) {
			checked = false;
			tip = i18n.lbl_PhoneRequired;
		} else {
			api_ExistsPhoneNo({
				AreaCode: _areaCode,
				Phone: val
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data) {
								setStatus(prev => ({
									...prev,
									phoneNo: {
										checked: false,
										msg: i18n.msg_PhoneExisted
									}
								}));
							} else {
								setStatus(prev => ({
									...prev,
									phoneNo: {
										checked: true,
										msg: ""
									}
								}));
							}
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

		setStatus(prev => ({
			...prev,
			phoneNo: {
				checked: checked,
				msg: tip
			}
		}));

		return checked;
	};

	const checkBirth = (day, month, year) => {
		let checked = true;
		let message = "";

		if (!day || !month || !year) {
			checked = false;
			message = i18n["msg_SelectBirthDay"];
		}

		setStatus(prevState => ({
			...prevState,
			birth: {
				checked: checked,
				msg: message
			}
		}));

		return checked;
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setUserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const clickSubmit = () => {
		let year = yearOptions[yearSelectedIdx]?.value;
		let month = monthOptions[monthSelectedIdx]?.value;
		let day = daySelectedIdx + 1;

		let accountNameCheck = userInfo.accountName
			? true
			: checkAccountName(userValue.accountName);

		let birthCheck = userInfo.birth_d ? true : checkBirth(day, month, year);

		let phoneCheck = userInfo.phoneNo
			? true
			: checkPhone(userValue.phoneNo);

		if (accountNameCheck && birthCheck && phoneCheck) {
			setUserValue(prevState => ({
				...prevState,
				Birth: `${year} / ${month} / ${day}`
			}));

			const closePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					setRedirectPath(_redirectPath);
				}
			};

			const openOtpHint = () => {
				setPopBox({
					isOpen: true,
					title: i18n.msg_Updatesuccessful,
					content: <div>{i18n["lbl_VertifyContactConfirm"]}</div>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={closePopbox}>
								{i18n["lbl_Later"]}
							</button>
							<button className="orange" onClick={clickOtp}>
								{i18n["lbl_VerifyNow"]}
							</button>
						</div>
					)
				});
			};
			const setProfile = () => {
				let profileData = {
					AccountName: userInfo.accountName ?? userValue.accountName,
					Birth_d: userInfo.birth_d ?? `${day}`,
					Birth_m: userInfo.birth_m ?? `${month}`,
					Birth_y: userInfo.birth_y ?? `${year}`,
					CountryCode: country,
					AreaCode: userInfo.areaCode ?? _areaCode,
					PhoneNo: userInfo.phoneNo ?? userValue.phoneNo
				};

				api_SetProfile(profileData).then(
					response => {
						if (isMountedRef.current) {
							const errorCode = response.data.errorCode;
							const message = response.data.message;

							if (errorCode === 0) {
								api_GetCustProfile().then(
									res => {
										if (isMountedRef.current) {
											if (res.data.errorCode === 0) {
												setUserInfo(prevState => ({
													...prevState,
													...res.data.data
												}));

												if (!userInfo.phoneVerified) {
													openOtpHint();
												}
											} else {
												setPopBox({
													isOpen: true,
													title:
														i18n.lbl_ImportantNote,
													content:
														response.data.message
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

								redirectToPrev(i18n, setPopBox, closePopbox);
							} else if (errorCode === 21) {
								setStatus(prevState => ({
									...prevState,
									phoneNo: { checked: false, msg: message }
								}));
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: message
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
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: userInfo.accountName
					? i18n.lbl_ProfileModifyWarning
					: i18n.msg_ConfirmRealNameAlert,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={closePopbox}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="orange" onClick={setProfile}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	const clickOtp = () => {
		const ClosePopbox = ({ _redirectPath }) => {
			setPopBox({ isOpen: false });
			if (_redirectPath) {
				setRedirectPath(_redirectPath);
			}
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Otp,
			ClosePopbox: ClosePopbox
		});
	};

	let arr = infoList
		.filter(item => {
			return (
				userInfo[item.infoTitle] ||
				(item.infoTitle === "birth" && item.birth_d)
			);
		})
		.map(item => {
			let _isVerified =
				item.infoTitle === "phoneNo" ? item.isVerified : null;

			return (
				<ColumnItem
					key={`profile-${item.infoTitle}`}
					title={item.colTitle}
					content={item.content}
					infoTitle={item.infoTitle}
					clickOtp={clickOtp}
					isVerified={_isVerified}
					i18n={i18n}
				/>
			);
		});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			{!userInfo?.accountName ? (
				<Inputbox
					icon="icon-member"
					placeholder={i18n["lbl_RealName"]}
					onBlur={e => checkAccountName(e.target.value)}
					onChange={EditField.bind(null, "accountName")}
					checked={status.accountName.checked}
					tip={status.accountName.msg}
					value={userValue.accountName}
				/>
			) : null}

			{!userInfo?.birth_d || !userInfo?.birth_m || !userInfo?.birth_y ? (
				<Birthday
					i18n={i18n}
					userValue={userValue}
					monthOptions={monthOptions}
					dateOptions={dateOptions}
					yearOptions={yearOptions}
					yearSelectedIdx={yearSelectedIdx}
					monthSelectedIdx={monthSelectedIdx}
					daySelectedIdx={daySelectedIdx}
					checked={status.birth.checked}
					tip={status.birth.msg}
					dropdownStateHandler={dropdownStateHandler}></Birthday>
			) : null}

			{!userInfo?.phoneNo ? (
				<div className="inputBox parts">
					<span className="countryCode">{_areaCode}</span>
					<Inputbox
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n["lbl_Phone"]}
						onBlur={e => checkPhone(e.target.value)}
						onChange={EditField.bind(null, "phoneNo")}
						checked={status.phoneNo.checked}
						value={userValue.phoneNo}
					/>
					<div
						className={`errortip ${
							status.phoneNo.msg ? "open" : ""
						}`}>
						{status.phoneNo.msg}
					</div>
				</div>
			) : null}

			{!userInfo?.accountName ||
			!userInfo?.birth_d ||
			!userInfo?.phoneNo ? (
				<div className="btn-group">
					<button className="orange" onClick={clickSubmit}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			) : null}

			<div className="info">
				<ul>{arr}</ul>
			</div>
		</>
	);
};

const Birthday = props => {
	return (
		<div className="inputBox parts">
			<Dropdown
				i18n={props.i18n}
				mainKey="profile-month"
				options={props.monthOptions}
				colName="bday_month"
				onSelectItem={props.dropdownStateHandler.bind(
					null,
					"bday_month"
				)}
				selectedIdx={props.monthSelectedIdx}
				icon="icon icon-cake"
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				onSelectItem={props.dropdownStateHandler.bind(null, "bday_day")}
				selectedIdx={props.daySelectedIdx}
			/>
			<Dropdown
				mainKey="profile-year"
				options={props.yearOptions}
				colName="bday_year"
				onSelectItem={props.dropdownStateHandler.bind(
					null,
					"bday_year"
				)}
				selectedIdx={props.yearSelectedIdx}
			/>
			<div className={`errortip${!props.checked ? " open" : ""}`}>
				{props.tip}
			</div>
		</div>
	);
};

const ColumnItem = props => {
	return (
		<li>
			<span className="title">
				{props.title}
				{props.isVerified ? (
					<i className="icon icon-checkmark"></i>
				) : null}
			</span>
			<span>{props.content}</span>
			{props.infoTitle === "phoneNo" && !props.isVerified ? (
				<>
					<button className="otpBtn" onClick={props.clickOtp}>
						<span className="icon icon-mobile"></span>
						<span>{props.i18n.lbl_MobileVerify}</span>
					</button>
				</>
			) : null}
		</li>
	);
};

const GetYear = () => {
	return new Date().getFullYear() - 21;
};

const GetDayOfMonth = (year, month) => {
	let d = new Date(year, month, 0);
	return d.getDate();
};

const date_format = v => {
	return moment(new Date(v)).format("lll");
};

export default Panel;
