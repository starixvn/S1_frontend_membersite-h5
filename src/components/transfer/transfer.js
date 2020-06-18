import React, { useContext, useEffect, useState } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { api_GetWalletInfo } from "../../service/api/account";
import { api_Transfer, api_GetTransferRecent } from "../../service/api/tp";
import { isConvert, checkAmount, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [getWalletInfo, setGetWalletInfo] = useState([]);
	const [amount, setAmount] = useState("1");
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [fromSelectedIdx, setFromSelectedIdx] = useState(0);
	const [toSelectedIdx, setToSelectedIdx] = useState(1);
	const [recentDatas, setRecentDatas] = useState([]);

	useEffect(() => {
		let mounted = true;
		api_GetWalletInfo().then(res => {
			if (res.data.errorCode === 0) {
				let data = res.data.data;
				if (data !== null) {
					let mainWallet = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: data.balance
					};
					let tpWalletsArr = data.tpWallets.map(i => {
						return {
							id: i.tpId,
							displayKey: i.displayKey,
							balance: i.balance
						};
					});

					if (mounted) {
						setGetWalletInfo([mainWallet, ...tpWalletsArr]);
					}
				}
			}
		});

		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setRecentDatas(res.data.data);
			}
		});

		return () => (mounted = false);
	}, []);

	const GetWalletInfo = () => {
		api_GetWalletInfo().then(res => {
			if (res.data.errorCode === 0) {
				let data = res.data.data;
				if (data !== null) {
					let mainWallet = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: data.balance
					};
					let tpWalletsArr = data.tpWallets.map(i => {
						return {
							id: i.tpId,
							displayKey: i.displayKey,
							balance: i.balance
						};
					});
					setGetWalletInfo([mainWallet, ...tpWalletsArr]);
				}
			}
		});
	};

	const GetTransferRecent = () => {
		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0) {
				setRecentDatas(res.data.data);
			}
		});
	};

	const VaildAmount = _amount => {
		const minAmount = 1;
		const maxAmount = getWalletInfo[fromSelectedIdx]?.balance;
		if (maxAmount === null || maxAmount === undefined) {
			return false;
		} else {
			let result = checkAmount(
				_amount,
				minAmount,
				maxAmount,
				_isConvert,
				i18n
			);
			if (result.status !== 0) {
				setWarning({
					status: true,
					msg: result.msg
				});
			} else {
				setWarning({
					status: false,
					msg: ""
				});
			}
			return result.status === 0;
		}
	};

	const EditAmount = e => {
		let value = e.target.value;
		VaildAmount(value);
		setAmount(value);
	};

	const setMaxAmount = () => {
		const balance = getWalletInfo[fromSelectedIdx]?.balance;
		let _balance = _isConvert ? Number(balance) / 1000 : Number(balance);
		_balance > 0 ? setAmount(`${_balance}`) : setAmount("1");
	};

	const selectItem = (i, col) => {
		if (
			(i === 0 && col === "transferFrom") ||
			(i === 1 && col === "transferTo")
		) {
			setFromSelectedIdx(0);
			setToSelectedIdx(1);
		} else {
			setFromSelectedIdx(1);
			setToSelectedIdx(0);
		}
	};

	const clickSubmit = () => {
		let result = VaildAmount(amount);
		let direction = fromSelectedIdx === 0 ? 1 : 2;

		if (result) {
			let real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);

			api_Transfer({
				TpId: getWalletInfo[fromSelectedIdx].TpId ?? 1,
				amount: real_amount,
				direction: direction
			}).then(res => {
				if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						title: i18n["lbl_ImportantNote"],
						content: res.data.message
					});
				} else {
					GetWalletInfo();
					setAmount("1");
					GetTransferRecent();
				}
			});
		}
	};

	return (
		<>
			<div className="account">
				<div className="info">
					<span className="title">{i18n["lbl_MainWallet"]}</span>
					<div>
						{number_format(getWalletInfo[0]?.balance, _isConvert)}
					</div>
				</div>
				<ReloadSpin func={GetWalletInfo} />
			</div>
			<div className="account">
				<div className="info">
					<span className="title">{i18n["lbl_Wallet_Saba"]}</span>
					<div>
						{number_format(getWalletInfo[1]?.balance, _isConvert)}
					</div>
				</div>
				<ReloadSpin func={GetWalletInfo} />
			</div>

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-From"
					options={getWalletInfo}
					placeholder={i18n["lbl_TransferFrom"]}
					selectedIdx={fromSelectedIdx}
					i18n={i18n}
					onSelectItem={selectItem}
					colName="transferFrom"
				/>
			</div>

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-To"
					options={getWalletInfo}
					placeholder={i18n["lbl_TransferTo"]}
					selectedIdx={toSelectedIdx}
					onSelectItem={selectItem}
					i18n={i18n}
					colName="transferTo"
				/>
			</div>

			<div className="inputBox">
				<InputBox
					icon="icon-pencil"
					value={amount}
					inputType="tel"
					onChange={EditAmount}
					Warning={warning}
				/>
			</div>

			<div className="btn-group">
				<button className="blue" onClick={setMaxAmount}>
					{i18n["lbl_MaxAmount"]}
				</button>
				<button className="orange" onClick={clickSubmit}>
					{i18n["lbl_Transfer"]}
				</button>
			</div>

			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</>
	);
};

export default Panel;
