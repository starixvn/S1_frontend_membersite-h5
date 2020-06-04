import React, { useState, useContext, useEffect } from "react";
import Inputbox from "./inputbox";
import Dropdown from "../common/dropdown";
import { i18nContext } from "../context/i18n";
import { userInfoContext } from "../context/userInfo";
import areaCode from "../../datas/areaCode";
import moment from "moment";
import Profile from "./profile";

const country = "CS";

const initWarningState = {
	RealName: {
		status: false,
		msg: ""
	},
	Birthday: {
		status: false,
		msg: ""
	},
	Phone: {
		status: false,
		msg: ""
	}
};

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const [userValueState, setUserValueState] = useState({});
	const [warningState, setWarningState] = useState(initWarningState);

	const [yearSelectedIdx, setYearSelectedIdx] = useState();
	const [monthSelectedIdx, setMonthSelectedIdx] = useState();
	const [daySelectedIdx, setDaySelectedIdx] = useState();

	let aCode = areaCode[country].AreaCode;

	let status = 4;
	if (!userInfo.accountName && !userInfo.phoneNo && !userInfo.birth_d) {
		status = 3;
	} else if (!userInfo.accountName && !userInfo.phoneNo) {
		status = 1;
	} else if (!userInfo.accountName) {
		status = 2;
	}

	let infoList = [
		{
			infoTitle: "accountName",
			colTitle: "Real Name",
			content: userInfo.accountName
		},
		{
			infoTitle: "birth",
			colTitle: "Birthday",
			content: `${userInfo.birth_m}/${userInfo.birth_d}/${userInfo.birth_y}`,
			birth_d: userInfo.birth_d,
			birth_m: userInfo.birth_m,
			birth_y: userInfo.birth_y
		},
		{
			infoTitle: "phoneNo",
			colTitle: "Phone",
			content: `(${aCode})${userInfo.phoneNo}`
		},
		{
			infoTitle: "userName",
			colTitle: "Username",
			content: userInfo.userName
		},
		{
			infoTitle: "country",
			colTitle: "Country",
			content: userInfo.country
		},
		{
			infoTitle: "email",
			colTitle: "Email",
			content: userInfo.email
		},
		{
			infoTitle: "regTime",
			colTitle: "Register Time",
			content: date_format(userInfo.regTime)
		},
		{
			infoTitle: "lastLogin",
			colTitle: "Last Login",
			content: date_format(userInfo.lastLogin)
		}
	];

	const monthOptions = [
		{ value: 1, id: 0, displayText: i18n["lbl_Month1"] },
		{ value: 2, id: 1, displayText: i18n["lbl_Month2"] },
		{ value: 3, id: 2, displayText: i18n["lbl_Month3"] },
		{ value: 4, id: 3, displayText: i18n["lbl_Month4"] },
		{ value: 5, id: 4, displayText: i18n["lbl_Month5"] },
		{ value: 6, id: 5, displayText: i18n["lbl_Month6"] },
		{ value: 7, id: 6, displayText: i18n["lbl_Month7"] },
		{ value: 8, id: 7, displayText: i18n["lbl_Month8"] },
		{ value: 9, id: 8, displayText: i18n["lbl_Month9"] },
		{ value: 10, id: 9, displayText: i18n["lbl_Month10"] },
		{ value: 11, id: 10, displayText: i18n["lbl_Month11"] },
		{ value: 12, id: 11, displayText: i18n["lbl_Month12"] }
	];

	let yearOptions = [];
	let dateOptions = [];

	let startYear = GetYear();
	let month =
		monthSelectedIdx === undefined
			? ""
			: monthOptions[monthSelectedIdx].value;
	for (let i = startYear; i >= startYear - 80; i--) {
		yearOptions.push({ value: i, id: i, displayText: i });
	}
	let year =
		yearSelectedIdx === undefined ? "" : yearOptions[yearSelectedIdx].value;

	let days = GetDayOfMonth(year, month);
	for (let i = 1; i <= days; i++) {
		dateOptions.push({ value: i, id: i, displayText: i });
	}

	const dropdownStateHandler = (i, col) => {
		if (col === "bday_year") {
			let year = yearOptions[i].value;
			setUserValueState(prevState => ({
				...prevState,
				[col]: year
			}));
			setYearSelectedIdx(i);
		} else if (col === "bday_month") {
			let month = monthOptions[i].value;
			setUserValueState(prevState => ({
				...prevState,
				[col]: month
			}));
			setMonthSelectedIdx(i);
		} else {
			setUserValueState(prevState => ({
				...prevState,
				[col]: i
			}));
			setDaySelectedIdx(i);
		}
	};

	const checkInputboxHandler = (col, e) => {
		const val = e.target.value;
		let checked = true;
		let message = "";

		if (col === "RealName") {
			if (val === "") {
				checked = false;
				message = i18n["msg_EnterRealName"];
			}
		}

		if (col === "Phone") {
			if (val === "" || isNaN(val)) {
				checked = false;
				message = i18n["msg_EnterPhoneNumber"];
			}
		}
		setWarningState(prevState => {
			return {
				...prevState,
				[col]: {
					status: !checked,
					msg: message
				}
			};
		});
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setUserValueState(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const checkSubmitHandler = () => {
		let checked = true;
		if (
			status === 3 &&
			(!userValueState.RealName ||
				!userValueState.bd_day ||
				!userValueState.Phone)
		) {
			checked = false;
		} else if (
			status === 1 &&
			(!userValueState.RealName || !userValueState.Phone)
		) {
			checked = false;
		} else if (status === 2 && !userValueState.RealName) {
			checked = false;
		}
	};

	let arr = infoList
		.filter(item => {
			return (
				userInfo[item.infoTitle] ||
				(item.infoTitle === "birth" && item.birth_d)
			);
		})
		.map(item => {
			return (
				<ColumnItem
					key={`profile-${item.infoTitle}`}
					title={item.colTitle}
					content={item.content}
				/>
			);
		});

	return (
		<>
			<Profile />
			{status !== 4 ? (
				<Inputbox
					icon="icon-member"
					inputType="text"
					placeholder={i18n["lbl_RealName"]}
					onBlur={checkInputboxHandler.bind(null, "RealName")}
					onChange={EditField.bind(null, "RealName")}
					Warning={warningState.RealName}
				/>
			) : null}

			{status === 3 ? (
				<Birthday
					userValueState={userValueState}
					monthOptions={monthOptions}
					dateOptions={dateOptions}
					yearOptions={yearOptions}
					yearSelectedIdx={yearSelectedIdx}
					monthSelectedIdx={monthSelectedIdx}
					// clickDropdown={clickDropdown}
					dropdownStateHandler={dropdownStateHandler}
				/>
			) : null}

			{status === 2 || status === 3 ? (
				<div className="inputBox parts">
					<div className="dropdown">
						<a className="btn">
							<span className="text">{aCode}</span>
						</a>
					</div>

					<Inputbox
						icon="icon-phone"
						inputType="tel"
						placeholder={i18n["lbl_Phone"]}
						onBlur={checkInputboxHandler.bind(null, "Phone")}
						onChange={EditField.bind(null, "Phone")}
						Warning={warningState.Phone}
					/>
				</div>
			) : null}

			{status !== 4 ? (
				<div className="btn-group">
					<button className="orange" onClick={checkSubmitHandler}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			) : null}

			{status === 4 ? (
				<div className="mode">
					<button className="icon icon-sun"></button>
					<button className="icon icon-moon open"></button>
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
				mainKey="profile-month"
				options={props.monthOptions}
				colName="bday_month"
				onSelectItem={props.dropdownStateHandler}
				selectedIdx={props.monthSelectedIdx}
				icon="icon icon-cake"
			/>
			<Dropdown
				mainKey="profile-day"
				options={props.dateOptions}
				colName="bday_day"
				// clickDropdown={props.clickDropdown}
				onSelectItem={props.dropdownStateHandler}
				selectedIdx={props.userValueState?.bday_day}
			/>
			<Dropdown
				mainKey="profile-year"
				options={props.yearOptions}
				colName="bday_year"
				onSelectItem={props.dropdownStateHandler}
				selectedIdx={props.yearSelectedIdx}
			/>
		</div>
	);
};

const ColumnItem = props => {
	return (
		<li>
			<span className="title">{props.title}</span>
			<span>{props.content}</span>
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
