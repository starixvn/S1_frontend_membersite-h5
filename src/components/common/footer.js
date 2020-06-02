import React, { useContext } from "react";
import { Link } from "@reach/router";
import { userInfoContext } from "../context/userInfo";
import { i18nContext } from "../context/i18n";

const NavLink = props => (
	<Link
		{...props}
		getProps={({ isCurrent }) => {
			return {
				className: isCurrent ? "open" : ""
			};
		}}
	/>
);

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	if (userInfo?.isLogin) {
		return (
			<footer>
				<NavLink to="/">
					<div className="circleAnimation">
						<div className="icon icon-home"></div>
					</div>
					<span>{i18n.lbl_Home}</span>
				</NavLink>

				<NavLink to="/promotion/">
					<div className="circleAnimation">
						<div className="icon icon-promotion"></div>
					</div>
					<span>PROMOTION</span>
				</NavLink>

				<NavLink to="/wallet/">
					<div className="circleAnimation">
						<div className="icon icon-balance"></div>
					</div>
					<span>WALLET</span>
				</NavLink>

				<NavLink to="/livechat/">
					<div className="circleAnimation">
						<div className="icon icon-contact"></div>
					</div>
					<span>LIVE CHAT</span>
				</NavLink>

				<NavLink to="/member/">
					<div className="circleAnimation">
						<div className="icon icon-member"></div>
					</div>
					<span>MEMBER</span>
				</NavLink>
			</footer>
		);
	} else {
		return (
			<footer>
				<NavLink to="/">
					<div className="circleAnimation">
						<div className="icon icon-home"></div>
					</div>
					<span>{i18n.lbl_Home}</span>
				</NavLink>

				<NavLink to="/promotion/">
					<div className="circleAnimation">
						<div className="icon icon-promotion"></div>
					</div>
					<span>PROMOTION</span>
				</NavLink>

				<NavLink to="/wallet/">
					<div className="circleAnimation">
						<div className="icon icon-balance"></div>
					</div>
					<span>WALLET</span>
				</NavLink>

				<NavLink to="/livechat/">
					<div className="circleAnimation">
						<div className="icon icon-contact"></div>
					</div>
					<span>LIVE CHAT</span>
				</NavLink>
			</footer>
		);
	}
};

export default Footer;
