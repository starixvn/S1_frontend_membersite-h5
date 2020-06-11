import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetDepositInfoHistory } from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import moment from "moment";
import Dropdown from "../common/dropdown.icon";
import Inputbox from "../member/inputbox";

const quickPickList = [
	{ displayKey: "lbl_Today" },
	{ displayKey: "lbl_YesterDay" },
	{ displayKey: "lbl_ThisWeek" },
	{ displayKey: "lbl_LastWeek" },
	{ displayKey: "lbl_ThisMonth" },
	{ displayKey: "lbl_LastMonth" }
];

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [quickPickSelectedIdx, setquickPickSelectedIdx] = useState(null);

	const [startDayState, setStartDayState] = useState({});
	const [endDayState, setEndDatyState] = useState({});
	const [getDepositHistoryState, setGetDepositHistoryState] = useState([]);

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
	};

	const EditField = (col, e) => {
		let val = e.target.value;

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

		api_GetDepositInfoHistory(transactionData).then(response => {
			const errorCode = response.data.errorCode;
			const message = response.data.message;

			if (errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: message
				});
			} else {
				const data = response.data.data;

				let depoHistory = data.map(item => {
					const _isConvert = isConvert(userInfo.currencyId);
					const _number_format = number_format(
						item.amount,
						_isConvert
					);

					return {
						showDate: moment(item.createTime).format(
							"MM/DD/YYYY(Z)"
						),
						showTime: moment(item.createTime).format("hh:mm:ss A"),
						depositType: item.depositType,
						transId: item.transId,
						amount: _number_format,
						status: item.status
					};
				});
				setGetDepositHistoryState(depoHistory);
			}
		});
	};
	let arr = getDepositHistoryState.map(item => {
		return (
			<TransactionHistory
				key={`depositHistory-${item.transId}`}
				showDate={item.showDate}
				showTime={item.showTime}
				depositType={i18n[`lbl_DepositType${item.depositType}`]}
				transId={item.transId}
				amount={item.amount}
				status={i18n[`lbl_DepositStatus${item.status}`]}
			/>
		);
	});

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
					max={moment().format("YYYY-MM-DD")}
				/>

				<Inputbox
					icon="icon-calendar"
					inputType="date"
					onChange={EditField.bind(null, "endDay")}
					value={endDayState}
					max={moment().format("YYYY-MM-DD")}
				/>
			</div>

			<div className="btn-group">
				<button className="orange switch" onClick={submitHandler}>
					{i18n["lbl_Submit"]}
				</button>
			</div>

			{getDepositHistoryState && getDepositHistoryState.length > 0 ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history"></i>
							{i18n["lbl_TransactionHistory"]}
						</div>
						{/* <button className="icon icon-spinner11 clickBtn"></button> */}
					</div>
					<div className="infoList">{arr}</div>
				</div>
			) : null}
		</>
	);
};

const TransactionHistory = props => {
	const { i18n } = useContext(i18nContext);

	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n["lbl_Date"]}</span>
					<span>{props.showDate}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{props.showTime}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_ID"]}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Method"]}</span>
					<span>{props.depositType}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Amount"]}</span>
					<span>{props.amount}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Status"]}</span>
					<span>{props.status}</span>
				</li>
			</ul>
			<div className="btn-group"></div>
		</div>
	);
};

export default Panel;
