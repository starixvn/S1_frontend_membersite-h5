import React from "react";
import langKeys_Home from "./datas/langKeys_Home";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import { Router, createHistory, LocationProvider } from "@reach/router";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import LiveChat from "./pages/livechat";
import Layout from "./components/common/layout";
import Profile from "./components/member/profile";
import BankInfo from "./components/member/bankInfo";
import Member from "./pages/member";
import Deposit from "./pages/deposit";
import DepositHome from "./components/deposit/deposit";
import OnlineBanking from "./components/deposit/deposit.onlineBanking";
import MobilePay from "./components/deposit/deposit.mobilePay";
import LocalBank from "./components/deposit/deposit.localBank";
import DepositHistory from "./components/deposit/deposit.history";

const Index = () => {
	let history = createHistory(window);
	return (
		<Wrapper pageLangKeys={langKeys_Home}>
			<LocationProvider history={history}>
				<Layout>
					<Router>
						<Home path="/" />
						<Promotion path="promotion" />
						<Wallet path="wallet" />
						<LiveChat path="livechat" />
						<Member path="member">
							<Profile path="/" />
							<BankInfo path="bankinfo" />
						</Member>
						<Deposit path="deposit">
							<DepositHome path="/" />
							<OnlineBanking path="onlineBank" />
							<MobilePay path="mobilePay" />
							<LocalBank path="localBank" />
							<DepositHistory path="history" />
						</Deposit>
					</Router>
				</Layout>
			</LocationProvider>
			<PopBox />
		</Wrapper>
	);
};

export default Index;
