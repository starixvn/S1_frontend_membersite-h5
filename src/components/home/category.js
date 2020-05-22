import React, { useState } from "react";
import { Geti18n } from "../../service/language";

const pageList = {
	sports: { iconName: "icon icon-sports", displayKey: "lbl_Sports" },
	virtualsports: {
		iconName: "icon icon-virtualsports",
		displayKey: "lbl_VirtualSports"
	},
	livecasino: {
		iconName: "icon icon-livecasino",
		displayKey: "lbl_LiveCasino"
	},
	casino: { iconName: "icon icon-casino", displayKey: "lbl_Casino" },
	game: { iconName: "icon icon-game", displayKey: "lbl_Game" },
	keno: { iconName: "icon icon-keno", displayKey: "lbl_KenoAndLottery" }
};

const CategoryItem = ({ displayText, iconName, onClick }) => (
	<button className={iconName} onClick={onClick}>
		<div>{displayText}</div>
	</button>
);

const Category = () => {
	const [page, setPage] = useState("sports");

	const handlePage = pageKey => {
		setPage(() => pageKey);
	};

	let items = Object.keys(pageList).map(key => {
		let isOpen = page === key;
		return (
			<CategoryItem
				key={`home-category-${key}`}
				iconName={`${pageList[key].iconName}${isOpen ? " open" : ""}`}
				displayText={Geti18n(pageList[key].displayKey)}
				onClick={handlePage.bind(null, key)}
			/>
		);
	});
	return (
		<div id="content">
			<div className="sideBar">{items}</div>
			<div className="gameList">
				<a className="icon icon-soccer"></a>
				<a className="icon icon-baseball"></a>
				<a className="icon icon-basketball"></a>
				<a className="icon icon-badminton"></a>
				<a className="icon icon-esport"></a>
				<a className="icon icon-tennis"></a>
				<a className="icon icon-football"></a>
				<a className="icon icon-F1"></a>
			</div>
		</div>
	);
};

export default Category;
