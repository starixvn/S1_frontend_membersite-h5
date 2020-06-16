import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import {
	api_GetWithdrawalInfoHistory,
	api_SetWithdrawalCancel
} from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import moment from "moment";
import HistoryFilter from "../common/historyFilter";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);

	const submitHandler = (startDay, endDay) => {
		let transactionData = {
			StartDate: moment(startDay).unix(),
			EndDate: moment(endDay).endOf("day").unix(),
			PageNumber: 1
		};

		setFilterData(transactionData);
		api_GetWithdrawalInfoHistory(transactionData).then(response => {
			const errorCode = response.data.errorCode;
			if (errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: response.data.message
				});
			} else {
				setGetHistoryState(response.data.data);
			}
		});
	};

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			api_SetWithdrawalCancel(transId).then(res => {
				if (res.data.errorCode === 0) {
					api_GetWithdrawalInfoHistory(filterData).then(res => {
						if (res.data.errorCode === 0) {
							setGetHistoryState(res.data.data);
						}
					});
				}
			});
		};

		const ClickCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n["lbl_CancelConfirm"],
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={ClickCancel}>
						{i18n["lbl_Cancel"]}
					</button>
					<button className="orange" onClick={ClickSubmit}>
						{i18n["lbl_Submit"]}
					</button>
				</div>
			)
		});
	};

	let arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`withdrawalHistory-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				status={item.status}
				_isConvert={_isConvert}
				ClickCancel={ClickCancel.bind(this, item.transId)}
			/>
		);
	});

	return (
		<>
			<HistoryFilter submitHandler={submitHandler} />
			{getHistoryState ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history"></i>
							{i18n["lbl_TransactionHistory"]}
						</div>
						{/* <button className="icon icon-spinner11 clickBtn"></button> */}
					</div>
					{getHistoryState.length > 0 ? (
						<div className="infoList">{arr}</div>
					) : (
						<div className="not-found">{i18n["msg_NoData"]}</div>
					)}{" "}
				</div>
			) : null}
		</>
	);
};

export const TransactionHistory = props => {
	const { i18n } = useContext(i18nContext);

	let btnGroup = null;
	if (props.status === 1) {
		btnGroup = (
			<div className="btn-group">
				<button className="blue" onClick={props.ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
			</div>
		);
	}
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n["lbl_Date"]}</span>
					<span>
						{moment(props.createTime).format("MM/DD/YYYY(Z)")}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{moment(props.createTime).format("hh:mm:ss A")}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_ID"]}</span>
					<span>{props.transId}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Amount"]}</span>
					<span>{number_format(props.amount, props._isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Status"]}</span>
					<span>{i18n[`lbl_WithdrawalStatus${props.status}`]}</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	);
};

export default Panel;
