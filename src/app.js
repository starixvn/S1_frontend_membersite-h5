import React from "react";
import path from "./path";
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

import Withdrawal from "./pages/withdrawal";
import WithdrawalHome from "./components/withdrawal/withdrawal";
import WithdrawalHistory from "./components/withdrawal/withdrawal.history";

import Transfer from "./pages/transfer";
import TransferHome from "./components/transfer/transfer";
import TransferHistory from "./components/transfer/transfer.history";

import Statement from "./pages/statement";

import Message from "./pages/message";
import PersonalMsg from "./components/message/personalMsg";
import Announcement from "./components/message/announcement";

import Casino from "./pages/casino";

const Index = () => {
	let history = createHistory(window);
	return (
		<Wrapper pageLangKeys={langKeys_Home}>
			<LocationProvider history={history}>
				<Layout>
					<Router>
						<Home path={path.home.root} />
						<Promotion path={path.promotion.root} />
						<Wallet path={path.wallet.root} />
						<LiveChat path={path.livechat.root} />
						<Member path={path.member.root}>
							<Profile path={path.member.sub.root} />
							<BankInfo path={path.member.sub.bankInfo.root} />
						</Member>
						<Deposit path={path.deposit.root}>
							<DepositHome path={path.deposit.sub.root} />
							<OnlineBanking
								path={path.deposit.sub.onlineBank.root}>
								<OnlineBankingMain
									path={path.deposit.sub.onlineBank.sub.root}
								/>
								<SetOnlineBanking
									path={
										path.deposit.sub.onlineBank.sub
											.setOnlineBanking.root
									}
								/>
							</OnlineBanking>
							<MobilePay path={path.deposit.sub.mobilePay.root}>
								<MobilePayMain
									path={path.deposit.sub.mobilePay.sub.root}
								/>
								<SetMobilePay
									path={
										path.deposit.sub.mobilePay.sub
											.setMobilePay.root
									}
								/>
							</MobilePay>
							<LocalBank path={path.deposit.sub.localBank.root}>
								<LocalBankMain path="/" />
							</LocalBank>
							<DepositHistory
								path={path.deposit.sub.history.root}
							/>
						</Deposit>
						<Withdrawal path={path.withdrawal.root}>
							<WithdrawalHome path={path.withdrawal.sub.root} />
							<WithdrawalHistory
								path={path.withdrawal.sub.history.root}
							/>
						</Withdrawal>
						<Transfer path={path.transfer.root}>
							<TransferHome path={path.transfer.sub.root} />
							<TransferHistory
								path={path.transfer.sub.history.root}
							/>
						</Transfer>
						<Statement path={path.statement.root} />
						<Message path={path.message.root}>
							<PersonalMsg path={path.message.sub.root} />
							<Announcement
								path={path.message.sub.announcement.root}
							/>
						</Message>
						<Casino path={path.casino.root} />
					</Router>
				</Layout>
			</LocationProvider>
			<PopBox />
		</Wrapper>
	);
};

export default Index;
