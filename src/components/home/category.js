import React, { useState, useContext } from "react";
import {
	i18nContext,
	navContext,
	defPanel,
	userInfoContext
} from "../common/context";
import gameList from "../../datas/gameList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { Redirect } from "@reach/router";

const Category = () => {
	const { i18n } = useContext(i18nContext);
	const [category, setCategory] = useState("sports");
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [redirect, setRedirect] = useState({
		redirect: false,
		path: ""
	});

	const selectCategory = _category => {
		setCategory(_category);
	};

	const clickGame = ({ tpId, gameId, path }) => {
		if (path) {
			setRedirect({
				redirect: true,
				path: path
			});
		} else {
			GET_ENTER_PAGE(
				userInfo.langId,
				tpId,
				gameId,
				userInfo.isLogin,
				() => {
					setNav(defPanel.login);
				}
			);
		}
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
						: clickGame.bind(this, { ...item })
				}
				isOpen={`${_open ? " open" : ""}`}
				translation={i18n[item.translation]}
				items={item.items}
			/>
		);
	});

	let itemArr = gameList
		.filter(x => x.category === category)
		.map(x =>
			x.items.map(_item => {
				return (
					<Item
						key={`categoryItem-${_item.icon}`}
						colName={_item.icon}
						clickGame={clickGame.bind(this, { ..._item })}
					/>
				);
			})
		);

	return redirect.redirect ? (
		<Redirect to={redirect.path} noThrow />
	) : (
		<div className="content">
			<div className="sideBar">{listArr}</div>
			<div className="gameList">{itemArr}</div>
		</div>
	);
};

const CategoryItems = props => {
	return (
		<button
			className={`icon icon-${props.category}${props.isOpen}`}
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
