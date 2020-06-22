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
					src={`${config.imgUrl}/CMS/${config.siteName}/Casino/ch/event-pp-20200508.png?v=Bi9sQvlWs2-kbOqqc_vgn97I_Kkul82fwsPvKNHjdUY`}
					alt=""
				/>
			</a>
			<a href="#">
				<img
					className="banner"
					src={`${config.imgUrl}/CMS/${config.siteName}/Casino/ch/event-ygg-20200612.jpg?v=bbEvn37H2Y7i-U9f4S8SyyK0lTX_cHwABAWt71N1uj0`}
					alt=""
				/>
			</a>
		</Swiper>
	);
};

export default Slider;
