import React from "react";
import Step from "./step";
import { Link } from "@reach/router";

export const Panel = props => props.children;

export const Main = () => {
	return (
		<>
			<Step step={2} />
			<div className="inputBox channel">
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel1</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel2</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel3</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel4</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel5</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
				<a className="account">
					<div className="bankLogo">
						<img src="http://www.n88dev.com/common/images/BankLogo/ACB.png" />
					</div>
					<div className="info">
						<ul>
							<li>
								<span className="title">Momo channel6</span>
								<div className="tip">
									<span className="text-org">Limt :</span> 30
									('000)~300,000 ('000)
								</div>
							</li>
						</ul>
					</div>
				</a>
			</div>
			<div className="btn-group">
				<Link to="../" className="white">
					Back
				</Link>
			</div>
		</>
	);
};
