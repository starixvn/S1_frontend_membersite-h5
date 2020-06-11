import React, { useContext } from "react";
import { Link, Match } from "@reach/router";
import { userInfoContext, i18nContext } from "../common/context";
import path from "../../path";

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	if (userInfo.isLogin) {
		return (
			<footer>
				<Match path={path.home.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.home.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-home"></div>
								</div>
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.promotion.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>PROMOTION</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.wallet.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.wallet.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>WALLET</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.livechat.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.livechat.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-contact"></div>
								</div>
								<span>LIVE CHAT</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.member.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.member.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-member"></div>
								</div>
								<span>Member</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		);
	} else {
		return (
			<footer>
				<Match path={path.home.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.home.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-home"></div>
								</div>
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.promotion.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>PROMOTION</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.wallet.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.wallet.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>WALLET</span>
							</Link>
						);
					}}
				</Match>

				<Match path={path.livechat.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.livechat.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-contact"></div>
								</div>
								<span>LIVE CHAT</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		);
	}
};

export default Footer;
