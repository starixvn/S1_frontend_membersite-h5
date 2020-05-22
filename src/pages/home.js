import React from "react";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Category from "../components/home/category";
import ShortcutBar from "../components/home/shortcutBar";

const IndexPage = () => {
	return (
		<>
			<Slider />
			<Marquee />
			<Category />
			<ShortcutBar />
		</>
	);
};

export default IndexPage;
