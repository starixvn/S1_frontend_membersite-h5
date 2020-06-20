import React, { useEffect, useState, useContext } from "react";
import Step from "./step";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { Link, Redirect } from "@reach/router";
import { api_GetOnlinePaymentList } from "../../service/api/payment";
import PageVerify from "./deposit.pageVerify";
import path from "../../path";
import Loading from "../common/loading";

export const Panel = props => props.children;

export const Main = props => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [paymentList, setPaymentList] = useState([]);
	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	useEffect(() => {
		let mounted = true;
		if (props.location.state?.paymentList) {
			if (mounted) {
				setPaymentList(props.location.state.paymentList);
				setLoading(false);
			}
		} else {
			if (userInfo.isLogin) {
				setLoading(true);
				api_GetOnlinePaymentList().then(
					res => {
						if (mounted) {
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
						if (mounted) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: "API Server Error."
							});
							setLoading(false);
						}
					}
				);
			}
		}

		return () => (mounted = false);
	}, [
		props.location.state,
		i18n.lbl_ImportantNote,
		setPopBox,
		userInfo.isLogin
	]);

	let rows = paymentList?.map(p => {
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
					<Link to="/deposit" className="white">
						{i18n.lbl_Back}
					</Link>
				</div>
			</>
		) : (
			<></>
		);
	}
};
