import React, { useState, useContext } from "react";
import Profile from "./subMenu.profile";
import { navContext, defPanel } from "../context/nav";

const SubMenu = () => {
	const { nav, setNav } = useContext(navContext);
	const handleOpen = () => {
		setNav(prevState => {
			let newState =
				prevState === defPanel.subMenu ? null : defPanel.subMenu;
			return newState;
		});
	};

	let isOpen = nav === defPanel.subMenu;

	return (
		<>
			<div
				className={`close${isOpen ? " open" : ""}`}
				onClick={handleOpen}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div className={`subMenu${isOpen ? " open" : ""}`}>
				<Profile />

				<div className="subThBar">
					<a className="icon icon-deposit">
						<span>Deposit</span>
					</a>
					<a className="icon icon-transfer">
						<span>Transfer</span>
					</a>
					<a className="icon icon-withdrawal">
						<span>Withdrawal</span>
					</a>
				</div>
				<div className="subGameList">
					<button className="icon icon-sports open">
						<span>SPORTS</span>
					</button>
					<div className="open">
						<a className="icon icon-soccer open">SOCCER</a>
						<a className="icon icon-baseball open">BASEBALL</a>
						<a className="icon icon-basketball open">BASKETBALL</a>
						<a className="icon icon-badminton open">BADMINTON</a>
						<a className="icon icon-esport open">ESPORT</a>
						<a className="icon icon-tennis open">TENNIS</a>
						<a className="icon icon-football open">FOOTBALL</a>
						<a className="icon icon-F1 open">F1</a>
					</div>
					<button className="icon icon-virtualsports">
						<span>VIRTUAL SPORTS</span>
					</button>
					<div className="">
						<a className="icon icon-soccer">SOCCER</a>
						<a className="icon icon-baseball">BASEBALL</a>
						<a className="icon icon-basketball">BASKETBALL</a>
						<a className="icon icon-badminton">BADMINTON</a>
						<a className="icon icon-esport">ESPORT</a>
						<a className="icon icon-tennis">TENNIS</a>
						<a className="icon icon-football">FOOTBALL</a>
						<a className="icon icon-F1">F1</a>
					</div>
					<button className="icon icon-livecasino">
						<span>LIVE CASINO</span>
					</button>
					<div className="">
						<a className="icon icon-soccer">SOCCER</a>
						<a className="icon icon-baseball">BASEBALL</a>
						<a className="icon icon-basketball">BASKETBALL</a>
						<a className="icon icon-badminton">BADMINTON</a>
						<a className="icon icon-esport">ESPORT</a>
						<a className="icon icon-tennis">TENNIS</a>
						<a className="icon icon-football">FOOTBALL</a>
						<a className="icon icon-F1">F1</a>
					</div>
					<button className="icon icon-casino">
						<span>CASINO</span>
					</button>
					<div className="">
						<a className="icon icon-soccer">SOCCER</a>
						<a className="icon icon-baseball">BASEBALL</a>
						<a className="icon icon-basketball">BASKETBALL</a>
						<a className="icon icon-badminton">BADMINTON</a>
						<a className="icon icon-esport">ESPORT</a>
						<a className="icon icon-tennis">TENNIS</a>
						<a className="icon icon-football">FOOTBALL</a>
						<a className="icon icon-F1">F1</a>
					</div>
					<button className="icon icon-game">
						<span>GAME</span>
					</button>
					<div className="">
						<a className="icon icon-soccer">SOCCER</a>
						<a className="icon icon-baseball">BASEBALL</a>
						<a className="icon icon-basketball">BASKETBALL</a>
						<a className="icon icon-badminton">BADMINTON</a>
						<a className="icon icon-esport">ESPORT</a>
						<a className="icon icon-tennis">TENNIS</a>
						<a className="icon icon-football">FOOTBALL</a>
						<a className="icon icon-F1">F1</a>
					</div>
					<button className="icon icon-keno">
						<span>KENO &amp; LOTTERY</span>
					</button>
					<div className="">
						<a className="icon icon-soccer">SOCCER</a>
						<a className="icon icon-baseball">BASEBALL</a>
						<a className="icon icon-basketball">BASKETBALL</a>
						<a className="icon icon-badminton">BADMINTON</a>
						<a className="icon icon-esport">ESPORT</a>
						<a className="icon icon-tennis">TENNIS</a>
						<a className="icon icon-football">FOOTBALL</a>
						<a className="icon icon-F1">F1</a>
					</div>
				</div>
				<div className="memberFunction">
					<a className="icon icon-member">
						<span>Member</span>
					</a>
					<a className="icon icon-email">
						<span>Email</span>
					</a>
					<a className="icon icon-vip">
						<span>VIP Lv100</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default SubMenu;
