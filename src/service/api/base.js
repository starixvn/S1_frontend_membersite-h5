import axios from "axios";

//const rootURL = "http://localhost:60930";
const rootURL = "http://m.n88dev.com";

export const loginRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`
});

export const siteRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`
});

export const accountStrictRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/AccountStrict`
});

export const accountRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Account`
});

export const messageRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Message`
});
