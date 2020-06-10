import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { userInfoContext } from "../components/common/context";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	if (!userInfo.isLogin) {
		return <Redirect to="/" noThrow />;
	} else {
		return <>Hello</>;
	}
};

export default IndexPage;
