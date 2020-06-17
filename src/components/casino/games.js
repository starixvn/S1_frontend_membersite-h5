import React, { useContext } from "react";
import config from "../../config";
import { userInfoContext } from "../common/context";

const Games = props => {
	const { userInfo } = useContext(userInfoContext);
	let games = [];
	props.Games.forEach(t => {
		t.gameList.data.forEach(g => {
			let _isFavorite = props.Favorite.includes(`${t.value}_${g.gameId}`);
			games.push(
				<div
					className="info"
					key={`casino-game-${t.value}-${g.gameId}`}>
					<img
						onClick={props.SelectGame.bind(this, t.value, g)}
						src={`${config.apiURL}/common/images/Casino/${t.name}/${
							g.imgName[userInfo.langId] ?? g.imgName.en
						}`}
						alt={g.name[userInfo.langId] ?? g.name.en}
					/>
					<span>{t.name}</span>
					<span
						onClick={props.SetFavorite.bind(
							this,
							t.value,
							g.gameId
						)}
						className={`icon icon-star-${
							_isFavorite ? "full" : "empty"
						}`}></span>
				</div>
			);
		});
	});

	return <div className="slotList">{games}</div>;
};

export default Games;
