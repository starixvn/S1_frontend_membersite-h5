import React from "react";

const Panel = () => {
	return (
		<>
			<div className="tag">
				<button className="open">Profile</button>
				<button>Bank Info</button>
			</div>
			<div className="avatar">
				<a className="icon icon-camera"></a>
			</div>
			<div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv100
			</div>
			<div className="balance">THB 000,000,000,000.00</div>
		</>
	);
};

export default Panel;
