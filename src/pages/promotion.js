import React, { useEffect, useState, useContext } from "react";
import { userInfoContext } from "../components/common/context";
import { api_GetBanner } from "../service/api/site";
import config from "../config";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const [promotion, setPromotion] = useState([]);

	useEffect(() => {
		let mounted = true;
		api_GetBanner("Promotion").then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setPromotion(res.data.data);
			}
		});

		return () => (mounted = false);
	}, [userInfo]);

	return promotion.map(p => {
		let content = (
			<>
				<img
					src={`${config.imgUrl}/CMS/Nova88/Promotion/${userInfo.langId}/${p.imgName}`}
					alt={p.imgName}
				/>
				<div className="protitle">{p.title}</div>
				<div className="text"></div>
				<div className="btn-group">
					<button className="orange">DETAILS</button>
				</div>
			</>
		);
		return p.href ? (
			<a
				href={p.href}
				className="promodule"
				target="_blank"
				rel="noopener noreferrer"
				key={`promotion-${userInfo.langId}-${p.imgName}`}>
				{content}
			</a>
		) : (
			<a
				href="#"
				className="promodule"
				key={`promotion-${userInfo.langId}-${p.imgName}`}>
				{content}
			</a>
		);
	});
};

export default IndexPage;
