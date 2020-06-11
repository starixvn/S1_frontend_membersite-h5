import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_GetDepositInfoHistory } from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import moment from "moment";
import HistoryFilter from "../common/historyFilter";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [getDepositHistoryState, setGetDepositHistoryState] = useState(null);

	const submitHandler = (startDay, endDay) => {
		let transactionData = {
			StartDate: moment(startDay).unix(),
			EndDate: moment(endDay).unix(),
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

	let arr = getDepositHistoryState?.map(item => {
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
			<HistoryFilter submitHandler={submitHandler} />
			{getDepositHistoryState ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history"></i>
							{i18n["lbl_TransactionHistory"]}
						</div>
						{/* <button className="icon icon-spinner11 clickBtn"></button> */}
					</div>
					{getDepositHistoryState.length > 0 ? (
						<div className="infoList">{arr}</div>
					) : (
						`No Data`
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
