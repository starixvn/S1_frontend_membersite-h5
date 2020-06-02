import React, { useState, useContext } from "react";
import { i18nContext } from "../context/i18n";
import gameList from "../../datas/gameList";

const Category = () => {
	const { i18n } = useContext(i18nContext);
	const [category, setCategory] = useState("sports");

	const selectCategory = _category => {
		if (category === _category) {
			setCategory(null);
		} else {
			setCategory(_category);
		}
	};

	let listArr = gameList.map(item => {
		let _open = category === item.category;
		return (
			<CategoryItems
				key={`category-${item.category}`}
				category={item.category}
				onClick={selectCategory.bind(null, item.category)}
				isOpen={`${_open ? " open" : ""}`}
				translation={i18n[item.translation]}
				items={item.items}
			/>
		);
	});

	let itemArr = gameList.map(x =>
		x.items.map(_item => {
			return <Item key={`categoryItem-${_item}`} colName={_item} />;
		})
	);

	return (
		<div className="content">
			<div className="sideBar">{listArr}</div>
			<div className="gameList">{itemArr}</div>
		</div>
	);
};

const CategoryItems = props => {
	return (
		<button
			className={`icon icon-${props.category} ${props.isOpen}`}
			onClick={props.onClick}>
			<div>{props.translation}</div>
		</button>
	);
};

const Item = props => {
	return <a className={`icon icon-${props.colName}`}></a>;
};
export default Category;
