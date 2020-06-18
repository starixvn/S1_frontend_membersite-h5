import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import {
	api_GetDepositInfoHistory,
	api_SetDepositCancel
} from "../../service/api/payment";
import { number_format, isConvert } from "../common/common";
import moment from "moment";
import HistoryFilter from "../common/historyFilter";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import ReloadSpin from "../common/reloadSpin";

const Panel = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistoryState, setGetHistoryState] = useState(null);
	const [filterData, setFilterData] = useState(null);

	const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 0 });
	AUTO_FETCHING_DATA(
		api_GetDepositInfoHistory,
		filterData,
		pageInfo,
		setGetHistoryState,
		setPageInfo,
		setPopBox
	);

	const submitHandler = (startDay, endDay, isUnix) => {
		let transactionData = filterData;
		if (!isUnix) {
			transactionData = {
				StartDate: moment(startDay).unix(),
				EndDate: moment(endDay).endOf("day").unix()
			};
			setFilterData(transactionData);
		}

		setFilterData(transactionData);
		api_GetDepositInfoHistory({
			...transactionData,
			PageNumber: 1
		}).then(response => {
			const errorCode = response.data.errorCode;
			if (errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: response.data.message
				});
			} else {
				setGetHistoryState(response.data.data);
				if (response.data.totalPages >= response.data.pageNumber) {
					setPageInfo(() => ({
						totalPages: response.data.totalPages,
						pageNumber: response.data.pageNumber
					}));
				}
			}
		});
	};

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			api_SetDepositCancel(transId).then(res => {
				if (res.data.errorCode === 0) {
					setGetHistoryState(prevState => {
						let newD = [...prevState];
						let idx = newD.findIndex(x => x.transId === transId);
						newD[idx].status = 5;
						return newD;
					});
				}
			});
		};

		const ClickCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			title: "",
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
				key={`depositHistory-${item.transId}`}
				{...item}
				className="info"
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

export const TransactionHistory = props => {
	const { i18n } = useContext(i18nContext);

	let btnGroup = null;
	if (props.depositType === 3 && (props.status === 1 || props.status === 7)) {
		btnGroup = (
			<div className="btn-group">
				<button className="blue" onClick={props.ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
				<button
					className="orange openPopup"
					onClick={props.SubmitProof}>
					{i18n.lbl_SubmitProof}
				</button>
			</div>
		);
	}

	return (
		<div className={props.className}>
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
					<span className="title">{i18n["lbl_Method"]}</span>
					<span>{i18n[`lbl_DepositType${props.depositType}`]}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Amount"]}</span>
					<span>{number_format(props.amount, props._isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Status"]}</span>
					<span>{i18n[`lbl_DepositStatus${props.status}`]}</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	);
};

export default Panel;
