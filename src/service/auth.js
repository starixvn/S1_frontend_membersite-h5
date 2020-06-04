import {
	api_UserLogin,
	api_UserLogout,
	api_onlineCheck
} from "../service/api/account";
import { api_GetCustProfile } from "../service/api/accountStrict";

const isBrowser = typeof window !== `undefined`;

const getUser = () => {
	return window.localStorage.loginUser !== undefined &&
		window.localStorage.loginUser !== `undefined`
		? JSON.parse(window.localStorage.loginUser)
		: {};
};

const setUser = user => (window.localStorage.loginUser = JSON.stringify(user));

export const LOGIN = async (
	{ userName, password, isPersistent },
	CallbackLogin
) => {
	if (!isBrowser) return false;

	await api_UserLogin({
		UserName: userName,
		Userpwd: password,
		isPersistent: isPersistent
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				let userlangId = res.data.message.replace("/", "");

				api_GetCustProfile().then(res_custInfo => {
					let _loginUser = {
						userName: userName,
						langId: userlangId,
						isLogin: true
					};

					setUser(_loginUser);

					if (res_custInfo.data.errorCode === 0) {
						let data = res_custInfo.data.data;
						_loginUser = {
							..._loginUser,
							...data
						};
					}

					CallbackLogin(res.data.errorCode, "", true, _loginUser);
				});
			} else {
				CallbackLogin(res.data.errorCode, res.data.message, false, {});
			}
		},
		err => {
			CallbackLogin(999, "", false, {});
		}
	);

	return false;
};

export const IS_LOGGED_IN = () => {
	if (!isBrowser) return false;
	const user = getUser();
	return user && user.isLogin === true;
};

export const LOGOUT = callback => {
	if (!isBrowser) return;
	api_UserLogout().then(
		res => {
			if (res.data.errorCode === 0) {
				let loginUser = getUser();
				setUser({ ...loginUser, userName: null, isLogin: false });
				callback();
			}
		},
		err => {
			if (err.response.status === 401) {
				let loginUser = getUser();
				setUser({ ...loginUser, userName: null, isLogin: false });
				callback();
			}
		}
	);
};

export const ONLINE_CHECK = callback => {
	if (IS_LOGGED_IN()) {
		api_onlineCheck().then(
			res => {
				var result = res.data;
				if (result.errorCode !== null && result.errorCode !== 0) {
					if (IS_LOGGED_IN()) {
						let loginUser = getUser();
						setUser({
							...loginUser,
							userName: null,
							isLogin: false
						});
						callback(result.errorCode, result.message);
					}
				} else {
					setTimeout(ONLINE_CHECK.bind(this, callback), 10000);
				}
			},
			error => {
				if (error.response !== null && error.response.status === 401) {
					let loginUser = getUser();
					setUser({ ...loginUser, userName: null, isLogin: false });
					callback(error.response.status);
				} else {
					setTimeout(ONLINE_CHECK.bind(this, callback), 10000);
				}
			}
		);
	}
};
