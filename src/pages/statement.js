import React, { useState, useContext } from "react";
import {
	i18nContext,
	popBoxContext,
	userInfoContext
} from "../components/common/context";
import { api_GetStatement } from "../service/api/payment";
import { number_format, isConvert } from "../components/common/common";
import moment from "moment";
import HistoryFilter from "../components/common/historyFilter";

const IndexPage = () => {
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

		api_GetStatement(transactionData).then(response => {
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
				key={`statementHistory-${item.refTransId}`}
				showDate={moment(item.createTime).format("MM/DD/YYYY(Z)")}
				showTime={moment(item.createTime).format("hh:mm:ss A")}
				typeName={item.typeName}
				changeAmount={number_format(item.changeAmount, _isConvert)}
				beforeAmount={number_format(item.beforeAmount, _isConvert)}
				afterAmount={number_format(item.afterAmount, _isConvert)}
				direction={item.direction === 1 ? "+" : "-"}
				refTransId={item.refTransId}
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
					<span>{props.showDate}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{props.showTime}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_TypeName"]}</span>
					<span>{props.typeName}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_ChangeAmount"]}</span>
					<span>
						{props.direction}
						{props.changeAmount}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_BeforeAmount"]}</span>
					<span>{props.beforeAmount}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_AfterAmount"]}</span>
					<span>{props.afterAmount}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_RefTransId"]}</span>
					<span>{props.refTransId}</span>
				</li>
			</ul>
			<div className="btn-group"></div>
		</div>
	);
};

export default IndexPage;
