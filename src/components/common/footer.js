import React, { useContext } from "react";
import { Link, Match } from "@reach/router";
import { userInfoContext, i18nContext } from "../common/context";

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	if (userInfo.isLogin) {
		return (
			<footer>
				<Match path="/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link to="/" className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-home"></div>
								</div>
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/promotion/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/promotion"
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>PROMOTION</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/wallet/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/wallet"
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>WALLET</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/livechat/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/livechat"
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-contact"></div>
								</div>
								<span>LIVE CHAT</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/member/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/member"
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
				<Match path="/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link to="/" className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-home"></div>
								</div>
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/promotion/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/promotion"
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>PROMOTION</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/wallet/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/wallet"
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>WALLET</span>
							</Link>
						);
					}}
				</Match>

				<Match path="/livechat/">
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to="/livechat"
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
