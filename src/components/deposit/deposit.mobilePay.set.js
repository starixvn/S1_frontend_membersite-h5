import React, { useContext, useState } from "react";
import { i18nContext, userInfoContext } from "../../components/common/context";
import Step from "./step";
import config from "../../config";
import LimitTip from "./limitTip";
import { isConvert, number_format } from "../common/common";
import { Link } from "@reach/router";

const SetMobilePay = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState(0);

	let paymentInfo = props.location.state;

	const OnSelectAmount = value => {
		if (amount !== value) {
			setAmount(() => value);
		}
	};

	let amountBtn = paymentInfo?.amountList?.map(a => {
		return (
			<button
				className={amount === a ? "open" : ""}
				key={`deposit-mobilepay-${paymentInfo.groupId}-${paymentInfo.channelId}-${a}`}
				onClick={OnSelectAmount.bind(this, a)}>
				<i className="icon icon-checkmark"></i>
				{number_format(a, _isConvert)}
			</button>
		);
	});

	return (
		<>
			<Step step={3} />
			<div className="inputBox">
				<div className="account">
					<div className="bankLogo">
						<img
							src={`${config.apiURL}/common/images/MobilePay/${paymentInfo.groupName}.png`}
							alt={paymentInfo.groupName}
						/>
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Zalo</span>
								<LimitTip
									minAmount={paymentInfo.minAmount}
									maxAmount={paymentInfo.maxAmount}
									displayTextLimit={i18n.lbl_Unlimited}
									displayTextUnLimit={i18n.lbl_Limit}
									_isConvert={_isConvert}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<span className="infoStates">
				{number_format(amount, _isConvert)}
			</span>
			{amountBtn && amountBtn.length > 0 ? (
				<div className="buttonBox">{amountBtn}</div>
			) : null}
			<div className="btn-group">
				<Link to="../" className="white">
					{i18n.lbl_Back}
				</Link>
				<button className="orange">{i18n.lbl_Submit}</button>
			</div>
		</>
	);
};

export default SetMobilePay;
