import React, { useState, useContext } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext
} from "../common/context";
import gameList from "../../datas/gameList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { Redirect } from "@reach/router";

const Category = () => {
	const { i18n } = useContext(i18nContext);
	const [category, setCategory] = useState("sports");
	const [addClass, setAddClass] = useState("");

	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [redirect, setRedirect] = useState({
		redirect: false,
		path: ""
	});

	const selectCategory = _category => {
		setCategory(_category);
		if (_category === "casino") {
			setAddClass(" casinoList");
		} else if (_category === "livecasino") {
			setAddClass(" livecasinoList");
		} else {
			setAddClass("");
		}
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
					setNav(defNavPanel.login);
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
						key={`categoryItem-tpId: ${_item.tpId}-gameId: ${_item.gameId}`}
						colName={_item.icon}
						clickGame={clickGame.bind(this, { ..._item })}
						imgId={_item.imgId}
						span={_item.span}
					/>
				);
			})
		);

	return redirect.redirect ? (
		<Redirect to={redirect.path} noThrow />
	) : (
		<div className="content">
			<div className="sideBar">{listArr}</div>
			<div className={`gameList${addClass !== "" ? addClass : ""}`}>
				{itemArr}
			</div>
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
			className={
				props.colName !== "" ? `icon icon-${props.colName}` : null
			}
			onClick={props.clickGame}>
			<img src={props.imgId} alt="" />
			<span>{props.span}</span>
		</a>
	);
};
export default Category;
