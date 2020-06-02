import React from "react";
import langKeys_Home from "./datas/langKeys_Home";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import {
	Router,
	createMemorySource,
	createHistory,
	LocationProvider
} from "@reach/router";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import LiveChat from "./pages/livechat";
import Layout from "./components/common/layout";
import Member from "./pages/member";

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
						<Member path="member" />
					</Router>
				</Layout>
			</LocationProvider>
			<PopBox />
		</Wrapper>
	);
};

export default Index;
