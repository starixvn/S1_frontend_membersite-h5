import React from "react";
import Swiper from "react-id-swiper";
import config from "../../config";

const Slider = () => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		}
	};

	return (
		<Swiper {...params}>
			<a href="#">
				<img
					className="banner"
					src={`${config.imgUrl}/CMS/${config.siteName}/Casino/ch/event-ygg-20200508.png`}
					alt=""
				/>
			</a>
			<a href="#">
				<img
					className="banner"
					src={`${config.imgUrl}/CMS/${config.siteName}/Casino/ch/event-pp-20200508.png`}
					alt=""
				/>
			</a>
		</Swiper>
	);
};

export default Slider;
