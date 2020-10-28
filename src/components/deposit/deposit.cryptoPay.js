import React, { useContext, useState, useEffect, useRef } from "react";
import Step from "./step";
import { Link, Redirect } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../../components/common/context";
import { api_payment_GetCryptoPayInfoList } from "../../service/api/payment";
import path from "../../path";
import PageVerify from "./deposit.pageVerify";
import Loading from "../common/loading";

export const Panel = props => props.children;

export const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [paymentList, setPaymentList] = useState([]);
	const { setPopBox } = useContext(popBoxContext);

	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	useEffect(() => {
		if (props.location.state?.paymentList) {
			if (isMountedRef.current) {
				setLoading(false);
				setPaymentList(props.location.state.paymentList);
			}
		} else if (userInfo.isLogin) {
			setLoading(true);
			api_payment_GetCryptoPayInfoList().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data.length > 0) {
								setPaymentList(res.data.data);
							} else {
								setRedirectPath(`/${path.deposit.root}`);
							}
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [
		props.location.state,
		setPopBox,
		i18n.lbl_ImportantNote,
		userInfo.isLogin,
		i18n.msg_ApiServerError
	]);

	let rows = paymentList?.map(p => {
		return (
			<div key={`deposit-cryptoPay-${p.groupId}-${p.channelId}`}>
				<Link
					className={`icon icon-${p.groupName}`}
					state={p}
					to={p.channelName.replace(" ", "")}></Link>
				<span>{p.groupName}</span>
			</div>
		);
	});

	if (loading) {
		return <Loading />;
	} else {
		return redirectPath !== null ? (
			<Redirect to={redirectPath} noThrow />
		) : pageVerify ? (
			<>
				<Step step={2} />
				<div className="depositType">{rows}</div>
				<div className="btn-group">
					<Link to="../" className="white">
						{i18n.lbl_Back}
					</Link>
				</div>
			</>
		) : (
			<></>
		);
	}
};
