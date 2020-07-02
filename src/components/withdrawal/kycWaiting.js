import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext } from "../common/context";
import { api_KycCheck } from "../../service/api/payment";
import { Redirect } from "@reach/router";
import path from "../../path";

export default () => {
	const { i18n } = useContext(i18nContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		api_KycCheck().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 1) {
					setRedirectPath(`/${path.kyc.root}`);
				} else if (res.data.errorCode !== 2) {
					setRedirectPath(`/${path.withdrawal.root}`);
				}
			}
		});
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<div className="step">
				<div className="stepLine">
					<div className="stepBar100"></div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark"></div>
					</div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark"></div>
					</div>
				</div>
			</div>
			<div className="icon icon-like"></div>
			<span className="text-center">{i18n.lbl_WaitKYCHint}</span>
		</>
	);
};
