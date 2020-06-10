import React, { useState, useContext } from "react";
import { i18nContext } from "../common/context";
import Dropdown from "../common/dropdown.icon";
import Inputbox from "../member/inputbox";

const quickPickList = [
	{ id: 0, displayKey: "lbl_Today" },
	{ id: 1, displayKey: "lbl_YesterDay" },
	{ id: 2, displayKey: "lbl_ThisWeek" },
	{ id: 3, displayKey: "lbl_LastWeek" },
	{ id: 4, displayKey: "lbl_ThisMonth" },
	{ id: 5, displayKey: "lbl_LastMonth" }
];

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const [quickPickSelectedIdx, setquickPickSelectedIdx] = useState(0);

	const dropdownStateHandler = i => {
		setquickPickSelectedIdx(i);
	};

	return (
		<>
			<div className="inputBox">
				<Dropdown
					i18n={i18n}
					mainKey="deposit-history-quickPick"
					options={quickPickList}
					selectedIdx={quickPickSelectedIdx}
					icon="icon icon-calendar"
					onSelectItem={dropdownStateHandler}
				/>
			</div>
			<div className="inputBox parts">
				<Inputbox icon="icon-calendar" />

				<Inputbox icon="icon-calendar" />
			</div>
			<div className="btn-group">
				<button className="orange switch">Submit</button>
			</div>
		</>
	);
};

export default Panel;
