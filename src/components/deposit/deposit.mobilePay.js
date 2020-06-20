import React, { useContext, useState, useEffect } from "react";
import Step from "./step";
import { Link } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../../components/common/context";
import {
	api_GetMobilePayGroupList,
	api_GetMobilePayInfoList
} from "../../service/api/payment";
import config from "../../config";
import LimitTip from "./limitTip";
import { isConvert } from "../common/common";

export const Panel = props => props.children;

export const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [paymentList, setPaymentList] = useState([]);
	const [selGroupId, setSelGroupId] = useState(null);
	const [channelList, setChannelList] = useState([]);
	const { setPopBox } = useContext(popBoxContext);

	const _isConvert = isConvert(userInfo.currencyId);
	useEffect(() => {
		let mounted = true;
		if (props.location.state.paymentList) {
			setPaymentList(props.location.state.paymentList);
		} else {
			api_GetMobilePayGroupList().then(
				res => {
					if (res.data.errorCode === 0) {
						if (res.data.errorCode === 0 && mounted) {
							setPaymentList(res.data.data);
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				},
				err => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: "API Server Error."
					});
				}
			);
		}

		return () => (mounted = false);
	}, [props.location.state.paymentList]);

	const SelectPayment = groupId => {
		if (selGroupId !== groupId) {
			setSelGroupId(() => groupId);
			api_GetMobilePayInfoList(groupId).then(
				res => {
					if (res.data.errorCode === 0) {
						setChannelList(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				},
				err => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: "API Server Error."
					});
				}
			);
		}
	};

	let rows = paymentList?.map(p => {
		return (
			<div key={`deposit-mobilepay-${p.groupId}`}>
				<button
					className={`icon icon-${p.groupName}${
						selGroupId === p.groupId ? " switch open" : ""
					}`}
					onClick={SelectPayment.bind(this, p.groupId)}></button>
				<span>{p.groupName}</span>
			</div>
		);
	});

	let channels = channelList?.map(c => {
		return (
			<Link
				className="account"
				key={`deposit-mobilepay-${c.channelId}`}
				to={`${c.channelName.replace(" ", "")}`}
				state={{
					...c
				}}>
				<div className="bankLogo">
					<img
						src={`${config.imgUrl}/common/images/MobilePay/${c.groupName}.png`}
						alt={c.groupName}
					/>
				</div>
				<div className="info">
					<ul>
						<li>
							<span className="title">{c.channelName}</span>
							<LimitTip
								minAmount={c.minAmount}
								maxAmount={c.maxAmount}
								displayTextLimit={i18n.lbl_Unlimited}
								displayTextUnLimit={i18n.lbl_Limit}
								_isConvert={_isConvert}
							/>
						</li>
					</ul>
				</div>
			</Link>
		);
	});

	return (
		<>
			<Step step={2} />
			<div className="depositType">{rows}</div>
			<div
				className={`inputBox channel${
					selGroupId !== null ? " open" : ""
				}`}>
				{channels}
			</div>
			<div className="btn-group">
				<Link to="../" className="white">
					{i18n.lbl_Back}
				</Link>
			</div>
		</>
	);
};
