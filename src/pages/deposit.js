import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { userInfoContext } from "../components/common/context";
import Deposit from "../components/deposit/deposit.history";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	if (!userInfo.isLogin) {
		return <Redirect to="/" noThrow />;
	} else {
		return <Deposit />;
	}
};

export default IndexPage;
