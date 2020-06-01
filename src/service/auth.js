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

export const login = async ({ username, password }, callback) => {
	if (!isBrowser) return false;

	await api_UserLogin({
		UserName: username,
		Userpwd: password
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				let userLangCode = res.data.message.replace("/", "");
				let _loginUser = {
					username: username,
					langCode: userLangCode,
					isLogin: true
				};
				callback(
					res.data.errorCode,
					"",
					true,
					_loginUser,
					userLangCode
				);
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

export const isLoggedIn = () => {
	if (!isBrowser) return false;
	const user = getUser();
	return user && user.isLogin === true;
};

export const logout = callback => {
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

export const OnlineCheck = callback => {
	if (isLoggedIn()) {
		api_onlineCheck().then(
			res => {
				var result = res.data;
				if (result.errorCode !== null && result.errorCode !== 0) {
					if (isLoggedIn()) {
						let loginUser = getUser();
						setUser({
							...loginUser,
							username: null,
							isLogin: false
						});
						callback(result.errorCode, result.message);
					}
				} else {
					setTimeout(OnlineCheck.bind(this, callback), 10000);
				}
			},
			error => {
				if (error.response !== null && error.response.status === 401) {
					let loginUser = getUser();
					setUser({ ...loginUser, username: null, isLogin: false });
					callback(error.response.status);
				} else {
					setTimeout(OnlineCheck.bind(this, callback), 10000);
				}
			}
		);
	}
};
