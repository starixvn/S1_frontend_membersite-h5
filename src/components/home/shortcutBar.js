import React from "react";
import { Geti18n } from "../../service/language";

const ShortcutBar = () => {
	return (
		<div className="thBar">
			<a className="icon icon-deposit">
				<span>{Geti18n("lbl_Deposit")}</span>
			</a>
			<a className="icon icon-transfer">
				<span>{Geti18n("lbl_Transfer")}</span>
			</a>
			<a className="icon icon-withdrawal">
				<span>{Geti18n("lbl_Withdrawal")}</span>
			</a>
			<a className="icon icon-email">
				<span>{Geti18n("lbl_Email")}</span>
			</a>
			{/* <a className="icon icon-vip">
				<span>VIP LV100</span>
			</a> */}
		</div>
	);
};

export default ShortcutBar;
