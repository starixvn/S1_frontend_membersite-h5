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
import ReloadSpin from "../components/common/reloadSpin";
import AUTO_FETCHING_DATA from "../service/autoFetchingData";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	const [processing, setProcessing] = useState(false);

	AUTO_FETCHING_DATA(
		api_GetStatement,
		filterData,
		pageInfo,
		setGetHistoryState,
		setPageInfo,
		setPopBox
	);

	const submitHandler = (startDay, endDay, isUnix) => {
		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDay).unix(),
					EndDate: moment(endDay).endOf("day").unix()
				};
				setFilterData(transactionData);
			}
			api_GetStatement({
				...transactionData,
				PageNumber: 1
			}).then(
				response => {
					const errorCode = response.data.errorCode;

					if (errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: response.data.message
						});
					} else {
						setGetHistoryState(response.data.data);
						if (
							response.data.totalPages >= response.data.pageNumber
						) {
							setPageInfo(() => ({
								totalPages: response.data.totalPages,
								pageNumber: response.data.pageNumber
							}));
						}
					}
					setProcessing(false);
				},
				err => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: "API Server Error."
					});
					setProcessing(false);
				}
			);
		}
	};

	let arr = getHistoryState?.map(item => {
		return (
			<TransactionHistory
				key={`statementHistory-${item.refTransId}`}
				createTime={item.createTime}
				typeName={item.typeName}
				_isConvert={_isConvert}
				changeAmount={item.changeAmount}
				beforeAmount={item.beforeAmount}
				afterAmount={item.afterAmount}
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
						<ReloadSpin
							func={submitHandler.bind(
								this,
								filterData?.StartDate,
								filterData?.EndDate,
								true
							)}
						/>
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
						{moment(props.createTime).format("MM/DD/YYYY(Z)")}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{moment(props.createTime).format("hh:mm:ss A")}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_TypeName"]}</span>
					<span>{props.typeName}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_ChangeAmount"]}</span>
					<span>
						{props.direction}
						{number_format(props.changeAmount, props._isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_BeforeAmount"]}</span>
					<span>
						{number_format(props.beforeAmount, props._isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_AfterAmount"]}</span>
					<span>
						{number_format(props.afterAmount, props._isConvert)}
					</span>
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
