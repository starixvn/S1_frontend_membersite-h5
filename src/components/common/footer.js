import React, { useContext } from "react";
import { Link, Match } from "@reach/router";
import { userInfoContext, i18nContext } from "../common/context";
import path from "../../path";

const defChatLangSubUrl = {
	en: 1,
	id: 2,
	cs: 3,
	th: 4
};

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	if (userInfo.isLogin === false) {
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

				{/* <Match path={path.promotion.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>{i18n.lbl_Promotion}</span>
							</Link>
						);
					}}
				</Match> */}

				{/* <Match path={path.wallet.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.wallet.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>{i18n.lbl_Wallet}</span>
							</Link>
						);
					}}
				</Match> */}

				<a
					target="_blank"
					href="https://direct.lc.chat/11638088/"
					className="">
					<div className="circleAnimation">
						<div className="icon icon-contact"></div>
					</div>
					<span>{i18n.LiveChat}</span>
				</a>
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

				{/* <Match path={path.promotion.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-promotion"></div>
								</div>
								<span>{i18n.lbl_Promotion}</span>
							</Link>
						);
					}}
				</Match> */}

				{/* <Match path={path.wallet.root}>
					{props => {
						let isMatch = props.match !== null;
						return (
							<Link
								to={path.wallet.root}
								className={isMatch ? "open" : ""}>
								<div className="circleAnimation">
									<div className="icon icon-balance"></div>
								</div>
								<span>{i18n.lbl_Wallet}</span>
							</Link>
						);
					}}
				</Match> */}

				<a
					target="_blank"
					href={`https://direct.lc.chat/11638088/${
						defChatLangSubUrl[userInfo.langId] ?? ""
					}`}
					className="">
					<div className="circleAnimation">
						<div className="icon icon-contact"></div>
					</div>
					<span>{i18n.LiveChat}</span>
				</a>

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
								<span>{i18n.lbl_Me}</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		);
	}
};

export default Footer;
