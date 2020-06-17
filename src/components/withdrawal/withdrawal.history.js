import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetWithdrawalInfoHistory } from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import moment from "moment";
import HistoryFilter from "../common/historyFilter";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);

	const submitHandler = (startDay, endDay) => {
		let transactionData = {
			StartDate: moment(startDay).unix(),
			EndDate: moment(endDay).endOf("day").unix(),
			PageNumber: 1
		};

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

	let arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`withdrawalHistory-${item.transId}`}
				showDate={item.createTime}
				showTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				_isConvert={_isConvert}
				status={i18n[`lbl_WithdrawalStatus${item.status}`]}
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

const TransactionHistory = props => {
	const { i18n } = useContext(i18nContext);

	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n["lbl_Date"]}</span>
					<span>
						{moment(props.showDate).format("MM/DD/YYYY(Z)")}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{moment(props.showTime).format("hh:mm:ss A")}</span>
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
					<span>{props.status}</span>
				</li>
			</ul>
			<div className="btn-group"></div>
		</div>
	);
};

export default Panel;
