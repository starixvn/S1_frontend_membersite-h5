import React from "react";
import Swiper from "react-id-swiper";
import "../../styles/Nova88/css/swiper.css";
import config from "../../config";

const Autoplay = () => {
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
					src={`${config.imgUrl}/CMS/Nova88/Promotion/ch/banner-covid.jpg?v=Ran12ZQN84OeDyBG7pEzAHcLKtsSI5jf5CMWxIXks_k`}
					className="banner"
				/>
			</a>
			<a href="#">
				<img
					src={`${config.imgUrl}/CMS/Nova88/Promotion/ch/banner-FTDP.jpg?v=gEAZpv-4rdevGxrPXrxva6pbRaAc-U4rATMtb-UbvqA`}
					className="banner"
				/>
			</a>
		</Swiper>
	);
};

export default Autoplay;
