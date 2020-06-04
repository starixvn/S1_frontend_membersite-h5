import React, { useState, useContext } from "react";
import {
	i18nContext,
	navContext,
	defPanel,
	userInfoContext
} from "../common/context";
import gameList from "../../datas/gameList";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const SubGameList = () => {
	const { i18n } = useContext(i18nContext);
	const [category, setCategory] = useState(null);

	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	// GET_ENTER_PAGE(userInfo.langId, 1, 43, () => {
	// 	setNav(defPanel.login);
	// });

	const selectCategory = _category => {
		if (category === _category) {
			setCategory(null);
		} else {
			setCategory(_category);
		}
	};

	let arr = gameList.map(item => {
		let _open = category === item.category;
		return (
			<ItemList
				key={`subGameList-${item.category}`}
				onClick={selectCategory.bind(null, item.category)}
				isOpen={`${_open ? "open" : ""}`}
				category={item.category}
				items={item.items}
				translation={i18n[item.translation]}
				itemOpen={`${_open && !item._blank ? "open" : ""}`}
			/>
		);
	});

	return <div className="subGameList">{arr}</div>;
};

const ItemList = props => {
	let itemArr = props.items.map((item, i) => {
		return (
			<Item
				itemOpen={props.itemOpen}
				colName={props.items[i]}
				key={`subGameItem-${i}`}
			/>
		);
	});

	return (
		<>
			<button
				className={`icon icon-${props.category} ${props.isOpen}`}
				onClick={props.onClick}>
				<span>{props.translation}</span>
			</button>
			<div className={props.itemOpen}>{itemArr}</div>
		</>
	);
};

const Item = props => {
	return (
		<a className={`icon icon-${props.colName} ${props.itemOpen}`}>
			{props.colName.toUpperCase()}
		</a>
	);
};

export default SubGameList;
