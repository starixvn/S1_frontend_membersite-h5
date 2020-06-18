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
		<div className="slotBanner">
			<Swiper {...params}>
				<a href="#">
					<img
						src={`${config.apiURL}/CMS/Nova88/Casino/ch/event-ygg-20200508.png`}
						alt=""
					/>
				</a>
				<a href="#">
					<img
						src={`${config.apiURL}/CMS/Nova88/Casino/ch/event-pp-20200508.png`}
						alt=""
					/>
				</a>
			</Swiper>
		</div>
	);
};

export default Slider;
