import React, { useEffect, useState, useContext } from "react";
import Swiper from "react-id-swiper";
import "../../styles/Nova88/css/swiper.css";
import config from "../../config";
import { api_GetBanner } from "../../service/api/site";
import { userInfoContext } from "../../components/common/context";

const Panel = ({ ImgFolder }) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);

	useEffect(() => {
		let mounted = true;
		api_GetBanner(ImgFolder).then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setBanner(res.data.data);
			}
		});

		return () => (mounted = false);
	}, [userInfo, ImgFolder]);

	let rows = banner.map(b => {
		return (
			<a href={b.href ?? "#"} key={`${b.lang}-${b.imgName}`}>
				<img
					src={`${config.imgUrl}/CMS/${config.siteName}/${ImgFolder}/${b.lang}/${b.imgName}`}
					className="banner"
					alt={b.imgName}
				/>
			</a>
		);
	});

	return <Autoplay Rows={rows} />;
};

const Autoplay = props => {
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
		},
		rebuildOnUpdate: true
	};

	return <Swiper {...params}>{props.Rows}</Swiper>;
};

export default Panel;
