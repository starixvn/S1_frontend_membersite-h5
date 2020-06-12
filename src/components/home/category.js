import React, { useState, useContext } from "react";
import {
	i18nContext,
	navContext,
	defPanel,
	userInfoContext
} from "../common/context";
import gameList from "../../datas/gameList";
import { GET_ENTER_PAGE } from "../../service/enterPage";

const Category = () => {
	const { i18n } = useContext(i18nContext);
	const [category, setCategory] = useState("sports");
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	const selectCategory = _category => {
		setCategory(_category);
	};

	const clickGame = (tpId, gameId) => {
		GET_ENTER_PAGE(userInfo.langId, tpId, gameId, userInfo.isLogin, () => {
			setNav(defPanel.login);
		});
	};

	let listArr = gameList.map(item => {
		let _open = category === item.category;
		return (
			<CategoryItems
				key={`category-${item.category}`}
				category={item.category}
				onClick={
					!item._blank
						? selectCategory.bind(null, item.category)
						: clickGame.bind(this, item.tpId, item.gameId)
				}
				isOpen={`${_open ? " open" : ""}`}
				translation={i18n[item.translation]}
				items={item.items}
			/>
		);
	});

	let itemArr = gameList.map(x =>
		x.items.map(_item => {
			if (x.category === category) {
				return (
					<Item
						key={`categoryItem-${_item.icon}`}
						colName={_item.icon}
						clickGame={clickGame.bind(
							this,
							_item.tpId,
							_item.gameId
						)}
					/>
				);
			}
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
	return (
		<a
			className={`icon icon-${props.colName}`}
			onClick={props.clickGame}></a>
	);
};
export default Category;
