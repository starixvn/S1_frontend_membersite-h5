import React, { useContext } from "react";
import { popBoxContext } from "../common/context";

const PopUp = () => {
	const { popBox, setPopBox } = useContext(popBoxContext);
	const handlePopBox = () => {
		setPopBox(prevState => ({ ...prevState, isOpen: false }));
	};

	return (
		<div id="popup" className={`${popBox.isOpen ? "show" : ""}`}>
			<div className="popTit">
				<div className={`close open`} onClick={handlePopBox}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				{popBox.title}
			</div>
			<div className="popTxt">{popBox.content}</div>
			{popBox.hasBtn === true ? popBox.btnBar : <></>}
		</div>
	);
};
export default PopUp;
