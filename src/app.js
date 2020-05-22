import React from "react";
import langKeys_Home from "./datas/langKeys_Home";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import { Router } from "@reach/router";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import LiveChat from "./pages/livechat";
import Layout from "./components/common/layout";

const Index = () => {
	return (
		<Wrapper pageLangKeys={langKeys_Home}>
			<Layout>
				<Router>
					<Home path="/" />
					<Promotion path="promotion" />
					<Wallet path="wallet" />
					<LiveChat path="livechat" />
				</Router>
			</Layout>
			<PopBox />
		</Wrapper>
	);
};

export default Index;
