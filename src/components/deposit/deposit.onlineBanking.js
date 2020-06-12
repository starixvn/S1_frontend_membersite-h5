import React, { useEffect, useState, useContext } from "react";
import Step from "./step";
import { i18nContext } from "../common/context";
import { Link } from "@reach/router";
import { api_GetOnlinePaymentList } from "../../service/api/payment";

export const Panel = props => props.children;

export const Main = props => {
	const { i18n } = useContext(i18nContext);
	const [paymentList, setPaymentList] = useState([]);

	useEffect(() => {
		if (props.location.state.paymentList) {
			setPaymentList(props.location.state.paymentList);
		} else {
			api_GetOnlinePaymentList().then(res => {
				if (res.data.errorCode === 0) {
					setPaymentList(res.data.data);
				}
			});
		}
	}, [props.location.state.paymentList]);

	let rows = paymentList.map(p => {
		return (
			<div key={`onlinebanking-${p.payId}-${p.channelId}`}>
				<Link
					to={`${p.payName}`}
					state={{
						payId: p.payId
					}}
					className={`icon icon-${p.payName}`}
				/>
				<span>{p.payName}</span>
			</div>
		);
	});
	return (
		<>
			<Step step={2} />
			<div className="depositType">{rows}</div>
			<div className="btn-group">
				<Link to="/deposit" className="white">
					{i18n.lbl_Back}
				</Link>
			</div>
		</>
	);
};
