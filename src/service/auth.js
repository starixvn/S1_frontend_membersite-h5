import {
	api_UserLogin,
	api_UserLogout,
	api_onlineCheck
} from "../service/api/account";

const isBrowser = typeof window !== `undefined`;

const getUser = () => {
	return window.localStorage.loginUser !== undefined &&
		window.localStorage.loginUser !== `undefined`
		? JSON.parse(window.localStorage.loginUser)
		: {};
};

const setUser = user => (window.localStorage.loginUser = JSON.stringify(user));

export const LOGIN = async ({ username, password, isPersistent }, callback) => {
	if (!isBrowser) return false;

	await api_UserLogin({
		UserName: username,
		Userpwd: password,
		isPersistent: isPersistent
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				let userlangId = res.data.message.replace("/", "");
				let _loginUser = {
					username: username,
					langId: userlangId,
					isLogin: true
				};
				callback(res.data.errorCode, "", true, _loginUser, userlangId);
				return setUser(_loginUser);
			} else {
				callback(res.data.errorCode, res.data.message, false, {});
			}
		},
		err => {
			callback(999, false, {});
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
				setUser({ ...loginUser, username: null, isLogin: false });
				callback();
			}
		},
		err => {
			if (err.response.status === 401) {
				let loginUser = getUser();
				setUser({ ...loginUser, username: null, isLogin: false });
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
							username: null,
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
					setUser({ ...loginUser, username: null, isLogin: false });
					callback(error.response.status);
				} else {
					setTimeout(ONLINE_CHECK.bind(this, callback), 10000);
				}
			}
		);
	}
};
