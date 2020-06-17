import React, { useState, useContext } from "react";
import { i18nContext, userInfoContext } from "../common/context";
import { TransactionHistory } from "./transfer.history";
import { isConvert, number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import { Link } from "@reach/router";
import path from "../../path";

const ReacentDatas = props => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [openRecentState, setOpenRecentState] = useState(false);

	const openRecent = () => {
		setOpenRecentState(prevState => !prevState);
	};

	const transferDirection = (
		_direction,
		displayMainWallet,
		displaySabaWallet
	) => {
		let startWallet = "";
		let endWallet = "";

		if (_direction === 1) {
			startWallet = displayMainWallet;
			endWallet = displaySabaWallet;
		} else {
			startWallet = displaySabaWallet;
			endWallet = displayMainWallet;
		}
		return { startWallet, endWallet };
	};

	let arr = props.datas?.map(item => {
		const _transferDirection = transferDirection(
			item.direction,
			i18n.lbl_MainWallet,
			i18n.lbl_Wallet_Saba
		);
		return (
			<TransactionHistory
				key={`transferRecent-${item.transId}`}
				createTime={item.createTime}
				transId={item.transId}
				amount={number_format(item.amount, _isConvert)}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				i18n={i18n}
			/>
		);
	});

	return (
		<>
			<div className="btn-group">
				<button className="orange switch" onClick={openRecent}>
					{i18n["lbl_RecentTransactions"]}
					<i
						className={`icon icon-circle-right${
							openRecentState ? " open" : ""
						}`}></i>
				</button>
			</div>

			{openRecentState ? (
				<div className="recent open">
					<div className="recentTransactions">
						<div className="smallTitle">
							<i className="icon icon-history">
								{i18n["lbl_RecentTransactions"]}
							</i>
						</div>
						<ReloadSpin func={props.GetRecentDatas} />
					</div>
					{props.datas?.length > 0 ? (
						<div className="infoList">{arr}</div>
					) : (
						<div className="not-found">{i18n["msg_NoData"]}</div>
					)}
					<div className="btn-group">
						<Link
							to={path.transfer.sub.history.root}
							href="transferhistory.html"
							className="orange recentBtn">
							{i18n["lbl_AllTranscations"]}
						</Link>
					</div>
				</div>
			) : null}
		</>
	);
};

export default ReacentDatas;
