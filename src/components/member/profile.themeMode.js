import React, { useContext } from "react";
import { themeContext } from "../common/context";
import themeList from "../../datas/theme";

const Panel = () => {
	const { theme, setTheme } = useContext(themeContext);
	const handleTheme = _theme => {
		if (theme !== _theme) {
			document.querySelector("html").setAttribute("class", _theme);
			setTheme(_theme);
		}
	};
	return (
		<div className="mode">
			<button
				className={`icon icon-sun${
					theme === themeList.default ? " open" : ""
				}`}
				onClick={handleTheme.bind(null, themeList.default)}></button>
			<button
				className={`icon icon-moon${
					theme === themeList.dark ? " open" : ""
				}`}
				onClick={handleTheme.bind(null, themeList.dark)}></button>
		</div>
	);
};

export default Panel;
