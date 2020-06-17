import React, { useContext, useState } from "react";
import { i18nContext } from "../common/context";
import GameTypes from "./defGameType";
import Dropdown from "../common/dropdown";

const SearchBox = props => {
	const { i18n } = useContext(i18nContext);

	const [openAdvance, setOpenAdvance] = useState(false);

	const gameTypeList = [
		{ id: null, displayText: i18n.lbl_All },
		...Object.keys(GameTypes).map(k => {
			return { id: k, displayText: i18n[GameTypes[k].displayKey] };
		})
	];

	const providerList = [
		{ id: null, displayText: i18n.lbl_All },
		...props.gameDatas?.map(d => {
			return {
				id: d.value,
				displayText: d.displayKey ? i18n[d.displayKey] : d.displayText
			};
		})
	];

	const HandleOpenAdvance = () => {
		setOpenAdvance(prevState => !prevState);
	};

	const EditField = (column, e) => {
		props.EditSearchField(column, e.target.value);
	};

	const SelectProvider = idx => {
		props.EditSearchField("provider", {
			idx: idx,
			value: providerList[idx].id
		});
	};

	const SelectGameType = idx => {
		props.EditSearchField("gameType", {
			idx: idx,
			value: gameTypeList[idx].id
		});
	};

	return (
		<>
			<div className="inputBox">
				<i className="icon icon-search"></i>
				<input
					className="search"
					placeholder="Search"
					value={props.searchText}
					onChange={EditField.bind(this, "searchText")}
				/>
				<button
					className="icon icon-equalizer filter"
					onClick={HandleOpenAdvance}></button>
			</div>
			<div className={`filterSelect${openAdvance ? " open" : ""}`}>
				<div className="inputBox">
					<Dropdown
						i18n={i18n}
						mainKey="casino-gamePlatform"
						options={providerList}
						selectedIdx={props.provider?.idx}
						onSelectItem={SelectProvider}
						placeholder={"Game Platform"}
					/>
				</div>
				<div className="inputBox">
					<Dropdown
						i18n={i18n}
						mainKey="casino-gamePlatform"
						options={gameTypeList}
						selectedIdx={props.gameType?.idx}
						onSelectItem={SelectGameType}
						placeholder={"Game Type"}
					/>
				</div>
			</div>
		</>
	);
};

export default SearchBox;
