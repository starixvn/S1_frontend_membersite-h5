import React, { useRef, useState, useEffect } from "react";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Category from "../components/home/category";
import ShortcutBar from "../components/home/shortcutBar";

const IndexPage = () => {
	const _shortcutBar = useRef(null);
	const [shortcutBarLocate, setShortcutBarLocate] = useState(null);

	useEffect(() => {
		if (_shortcutBar.current !== null) {
			setShortcutBarLocate(_shortcutBar.current?.getBoundingClientRect());
		}
	}, []);

	return (
		<>
			<Slider />
			<Marquee />
			<Category shortcutBarLocate={shortcutBarLocate} />
			<ShortcutBar _ref={_shortcutBar} />
		</>
	);
};

export default IndexPage;
