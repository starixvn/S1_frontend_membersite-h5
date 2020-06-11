import React, { useState, useContext } from "react";
import { i18nContext } from "../common/context";
import { api_GetDepositInfoHistory } from "../../service/api/payment";
import moment from "moment";
import Dropdown from "../common/dropdown.icon";
import Inputbox from "../member/inputbox";

const quickPickList = [
	{ id: 0, displayKey: "lbl_Today" },
	{ id: 1, displayKey: "lbl_YesterDay" },
	{ id: 2, displayKey: "lbl_ThisWeek" },
	{ id: 3, displayKey: "lbl_LastWeek" },
	{ id: 4, displayKey: "lbl_ThisMonth" },
	{ id: 5, displayKey: "lbl_LastMonth" }
];

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const [quickPickSelectedIdx, setquickPickSelectedIdx] = useState(null);

	const [userValueState, setUserValueState] = useState({});
	const [startDayState, setStartDayState] = useState({});
	const [endDayState, setEndDatyState] = useState({});

	let startDate = "";
	let endDate = "";

	const dropdownStateHandler = i => {
		setquickPickSelectedIdx(i);

		if (i === 0) {
			startDate = moment().format("YYYY-MM-DD");

			endDate = moment().format("YYYY-MM-DD");
		} else if (i === 1) {
			startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
			endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
		} else if (i === 2) {
			startDate = moment().startOf("week").format("YYYY-MM-DD");
			endDate = moment().format("YYYY-MM-DD");
		} else if (i === 3) {
			startDate = moment()
				.subtract(1, "weeks")
				.startOf("week")
				.format("YYYY-MM-DD");
			endDate = moment()
				.subtract(1, "weeks")
				.endOf("week")
				.format("YYYY-MM-DD");
		} else if (i === 4) {
			startDate = moment().startOf("month").format("YYYY-MM-DD");
			endDate = moment().format("YYYY-MM-DD");
		} else {
			startDate = moment()
				.subtract(1, "months")
				.startOf("month")
				.format("YYYY-MM-DD");
			endDate = moment()
				.subtract(1, "months")
				.endOf("month")
				.format("YYYY-MM-DD");
		}

		setStartDayState(startDate);
		setEndDatyState(endDate);

		setUserValueState(prevState => ({
			startDay: startDate,
			endDay: endDate
		}));
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		setUserValueState(prevState => ({
			...prevState,
			[col]: val
		}));

		if (col === "startDay") {
			setStartDayState(val);
		} else {
			setEndDatyState(val);
		}
	};

	const submitHandler = () => {
		let transactionData = {
			StartDate: moment(startDayState).unix(),
			EndDate: moment(endDayState).unix(),
			PageNumber: 1
		};
		console.log(transactionData);
		api_GetDepositInfoHistory(transactionData).then(response => {
			console.log(response);
		});
	};

	return (
		<>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="deposit-history-quickPick"
					options={quickPickList}
					selectedIdx={quickPickSelectedIdx}
					icon="icon icon-calendar"
					onSelectItem={dropdownStateHandler}
					placeholder={i18n["lbl_QuickPick"]}
				/>
			</div>

			<div className="inputBox parts">
				<Inputbox
					icon="icon-calendar"
					inputType="date"
					onChange={EditField.bind(null, "startDay")}
					value={startDayState}
					placeholder={i18n["lbl_From"]}
				/>

				<Inputbox
					icon="icon-calendar"
					inputType="date"
					onChange={EditField.bind(null, "endDay")}
					value={endDayState}
					placeholder={i18n["lbl_To"]}
				/>
			</div>

			<div className="btn-group">
				<button className="orange switch" onClick={submitHandler}>
					{i18n["lbl_Submit"]}
				</button>
			</div>
			<div className="recent open">
				<div className="recentTransactions">
					<div className="smallTitle">
						<i className="icon icon-history"></i>
						{i18n["lbl_TransactionHistory"]}
					</div>
					<button className="icon icon-spinner11 clickBtn"></button>
				</div>
				<div className="infoList"></div>
			</div>
		</>
	);
};

const TransactionHistory = props => {
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">Date</span>
					<span>3/13/2020 (+08:00)</span>
				</li>
				<li>
					<span className="title">Time</span>
					<span>04:26:39 PM</span>
				</li>
				<li>
					<span className="title">ID</span>
					<span>DD1120</span>
				</li>
				<li>
					<span className="title">Method</span>
					<span>Online Banking</span>
				</li>
				<li>
					<span className="title">Amount</span>
					<span>30 ('000)</span>
				</li>
				<li>
					<span className="title">Status</span>
					<span>Pending</span>
				</li>
			</ul>
			<div className="btn-group"></div>
		</div>
	);
};

export default Panel;
