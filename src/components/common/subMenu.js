import React, { useState, useContext } from "react";
import Profile from "./subMenu.profile";
import SubGameList from "../subMenu.gameList/subGameList";
import { i18nContext } from "../context/i18n";

const SubMenu = () => {
	const { i18n } = useContext(i18nContext);
	const [isOpen, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(prevState => setOpen(!prevState));
	};

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
						<span>{i18n["lbl_Deposit"]}</span>
					</a>
					<a className="icon icon-transfer">
						<span>{i18n["lbl_Transfer"]}</span>
					</a>
					<a className="icon icon-withdrawal">
						<span>{i18n["lbl_Withdrawal"]}</span>
					</a>
				</div>
				<SubGameList />
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
