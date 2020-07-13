import React, { useContext, useRef, useEffect, useState } from "react";
import {
	i18nContext,
	userInfoContext,
	walletInfoContext,
	popBoxContext
} from "../common/context";
import { number_format, isConvert } from "../common/common";
import { api_GetWalletInfo } from "../../service/api/account";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const isMountedRef = useRef(null);
	const [sabaWallet, setSabaWallet] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api_GetWalletInfo().then(
			res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					if (data !== null) {
						let tpWalletsArr = data.tpWallets.map(i => {
							return {
								id: i.tpId,
								displayKey: i.displayKey,
								balance: i.balance,
								bonus: i.bonus
							};
						});

						if (isMountedRef.current) {
							setWalletInfo(prevState => ({
								...prevState,
								main: data.balance
							}));

							setSabaWallet({
								balance: tpWalletsArr?.[0].balance,
								bonus: tpWalletsArr?.[0].bonus
							});
						}
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	}, [setWalletInfo, i18n, setPopBox]);

	let balance = number_format(
		walletInfo.main,
		isConvert(userInfo.currencyId)
	);

	const GetBalance = () => {
		api_GetWalletInfo().then(
			res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					if (data !== null) {
						let tpWalletsArr = data.tpWallets.map(i => {
							return {
								id: i.tpId,
								displayKey: i.displayKey,
								balance: i.balance
							};
						});

						if (isMountedRef.current) {
							setWalletInfo(prevState => ({
								...prevState,
								main: data.balance
							}));

							setSabaWallet({
								balance: tpWalletsArr?.[0].balance,
								bonus: tpWalletsArr?.[0].bonus
							});
						}
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	return (
		<>
			<div className="avatar"></div>
			<div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv{userInfo.userLevel}
			</div>
			<div className="account">
				<div className="info">
					<span className="title">{i18n["lbl_MainWallet"]}</span>
					<div>
						<span className="text-org">
							{i18n[`Currency_${userInfo.currencyId}`]}
						</span>{" "}
						{balance}
					</div>
				</div>
				<ReloadSpin func={GetBalance} />
			</div>
			{sabaWallet === null ? null : (
				<div className="account">
					<div className="info">
						<span className="title">{i18n["lbl_Wallet_Saba"]}</span>
						<div>
							<span className="text-org">
								{i18n[`Currency_${userInfo.currencyId}`]}
							</span>{" "}
							{number_format(
								sabaWallet.balance,
								isConvert(userInfo.currencyId)
							)}
						</div>
						<div>
							<span className="text-org">
								{i18n["lbl_Bonus"]}
							</span>{" "}
							{number_format(
								sabaWallet.bonus,
								isConvert(userInfo.currencyId)
							)}
						</div>
					</div>
					<ReloadSpin func={GetBalance} />
				</div>
			)}

			<ProfileDetail />
			<div className="btn-group">
				<button className="blue">
					<Link to={`/${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword}
					</Link>
				</button>
			</div>
		</>
	);
};

export default Panel;
