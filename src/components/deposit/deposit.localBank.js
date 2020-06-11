import React from "react";
import Step from "./step";
import { Link } from "@reach/router";

export const Panel = props => props.children;

export const Main = () => {
	return (
		<>
			<Step step={3} total={2} />
			<div className="inputBox">
				<div className="dropdown ">
					<button className="btn">
						<div className="bankLogo">
							<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
						</div>
						<span className="text">Asia Commercial Bank</span>
					</button>
					<div className="dropdown-container">
						<div className="dropdown-item">
							<div className="bankLogo">
								<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
							</div>
							<span className="text">Asia Commercial Bank</span>
						</div>
						<div className="dropdown-item">
							<div className="bankLogo">
								<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
							</div>
							<span className="text">Asia Commercial Bank</span>
						</div>
						<div className="dropdown-item">
							<div className="bankLogo">
								<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
							</div>
							<span className="text">Asia Commercial Bank</span>
						</div>
						<div className="dropdown-item">
							<div className="bankLogo">
								<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
							</div>
							<span className="text">Asia Commercial Bank</span>
						</div>
					</div>
				</div>
				<div className="tip">
					<span className="text-org">Limt :</span> 30 ('000)~300,000
					('000)
				</div>
			</div>
			<div className="inputBox">
				<i className="icon icon-pencil"></i>
				<input placeholder="Account" />
				<div className="tip">Amount can not be less than 0.</div>
			</div>
			<div className="btn-group">
				<Link to="../" className="white">
					Back
				</Link>
				<button className="orange">Submit</button>
			</div>
		</>
	);
};
