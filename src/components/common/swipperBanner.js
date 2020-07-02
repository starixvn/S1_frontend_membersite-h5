import React, { useEffect, useState, useContext } from "react";
import Swiper from "react-id-swiper";
import "../../styles/Nova88/css/swiper.css";
import config from "../../config";
import { api_GetBanner } from "../../service/api/site";
import {
	userInfoContext,
	navContext,
	defNavPanel
} from "../../components/common/context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../path";

const Panel = ({ ImgFolder }) => {
	const [banner, setBanner] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	useEffect(() => {
		let mounted = true;
		api_GetBanner(ImgFolder).then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setBanner(res.data.data);
			}
		});

		return () => (mounted = false);
	}, [userInfo, ImgFolder]);

	const ClickLink = (tpId, gameId, lang, href, isOuterLink, urlWithLang) => {
		if (tpId === null) {
			if (href === "Casino/Lobby") {
				window.location.href = `/${path.casino.root}`;
			} else if (href === "Promotion/Index") {
				window.location.href = `/${path.promotion.root}`;
			} else if (href === "Home/Register") {
			} else {
				window.open(
					isOuterLink
						? href
						: `${config.t_and_cURL}${
								urlWithLang ? `/${lang}` : ""
						  }/${href}`,
					"_blank"
				);
			}
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin === true,
				loginCallback: () => {
					setNav(defNavPanel.login);
				}
			});
		}
	};

	let rows = banner.map(b => {
		let _imgFolder = b.imgFolder ?? ImgFolder;
		let lang = b.lang.includes(userInfo.langId) ? userInfo.langId : "en";
		let actionLinkByLang = b.actionLinkByLang?.find(
			a => a.lang === userInfo.langId
		);
		let actionLink = actionLinkByLang
			? actionLinkByLang.link
			: b.actionLink;
		return (
			<button
				onClick={ClickLink.bind(
					this,
					b.tpId,
					b.gameId,
					lang,
					actionLink,
					b.outerLink === true,
					b.urlWithLang
				)}
				key={`${lang}-${b.img}`}>
				<img
					src={`${config.imgUrl}/CMS/${config.siteName}/${_imgFolder}/${lang}/${b.img}`}
					className="banner"
					alt={b.img}
				/>
			</button>
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
