import React from "react";
import Swiper from "react-id-swiper";
import "../../styles/Nova88/css/swiper.css";

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
					src="https://www.nova88.net/CMS/Nova88/Promotion/ch/banner-covid.jpg?v=Ran12ZQN84OeDyBG7pEzAHcLKtsSI5jf5CMWxIXks_k"
					className="banner"
				/>
			</a>
			<a href="#">
				<img
					src="https://www.nova88.net/CMS/Nova88/Promotion/ch/banner-FTDP.jpg?v=gEAZpv-4rdevGxrPXrxva6pbRaAc-U4rATMtb-UbvqA"
					className="banner"
				/>
			</a>
			{/* <a href="#">
				<img
					src="https://www.nova88.net/CMS/Nova88/Promotion/ch/banner-fishing.jpg?v=CxJQvOjoJxEgsz72zxvB8QAH9TUJA2_kRtxbxAyL3wA"
					className="banner"
				/>
			</a>
			<a href="#">
				<img
					src="https://www.nova88.net/CMS/Nova88/Promotion/ch/banner-promo10p.jpg?v=WiyJPdZ0cZVMn2Otoufjkwd6Xkc1hvMs8sl9Sk1hArg"
					className="banner"
				/>
			</a>
			<a href="#">
				<img
					src="https://www.nova88.net/CMS/Nova88/Promotion/ch/banner-PPT.jpg?v=R7KSZrm657eklziww2wD-Gt2jWqCzVutL0d8Wp4e76M"
					className="banner"
				/>
			</a> */}
		</Swiper>
	);
};

export default Autoplay;
