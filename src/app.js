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
import {
	Panel as OnlineBanking,
	Main as OnlineBankingMain
} from "./components/deposit/deposit.onlineBanking";
import SetOnlineBanking from "./components/deposit/deposit.onlineBanking.set";

import {
	Panel as MobilePay,
	Main as MobilePayMain
} from "./components/deposit/deposit.mobilePay";
import SetMobilePay from "./components/deposit/deposit.mobilePay.set";

import {
	Panel as LocalBank,
	Main as LocalBankMain
} from "./components/deposit/deposit.localBank";

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
							<OnlineBanking path="onlineBank">
								<OnlineBankingMain path="/" />
								<SetOnlineBanking path=":sysId" />
							</OnlineBanking>
							<MobilePay path="mobilePay">
								<MobilePayMain path="/" />
								<SetMobilePay path=":sysId" />
							</MobilePay>
							<LocalBank path="localBank">
								<LocalBankMain path="/" />
							</LocalBank>
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
