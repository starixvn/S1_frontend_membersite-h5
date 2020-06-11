import React from "react";
import Step from "./step";
import { Link } from "@reach/router";

export const Panel = props => props.children;

export const Main = () => {
	return (
		<>
			<Step step={2} />
			<div className="depositType">
				<div>
					<Link
						to="1"
						state={{
							sysId: 1
						}}
						className="icon icon-H2P"></Link>
					<span>Help2Pay</span>
				</div>
				<div>
					<a className="icon icon-CPP"></a>
					<span>CirclePay</span>
				</div>
				<div>
					<a className="icon icon-OCP"></a>
					<span>OneClickPay</span>
				</div>
				<div>
					<a className="icon icon-EZP"></a>
					<span>Eeziepay</span>
				</div>
				<div>
					<a className="icon icon-VNP"></a>
					<span>VNPay</span>
				</div>
			</div>
			<div className="btn-group">
				<Link to="/deposit" className="white">
					Back
				</Link>
			</div>
		</>
	);
};
