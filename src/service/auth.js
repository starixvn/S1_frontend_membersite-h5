import { UserLogin, UserLogout } from "../service/api/account";

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

	await UserLogin({
		UserName: username,
		Userpwd: password
	}).then(res => {
		if (res.data.errorCode === 0) {
			let userLangCode = res.data.message.replace("/", "");
			let _loginUser = {
				username: username
			};
			callback(true, _loginUser, userLangCode);
			return setUser(_loginUser);
		} else {
			callback(false, {});
			alert(res.data.message);
		}
	});

	return false;
};

export const isLoggedIn = () => {
	if (!isBrowser) return false;
	const user = getUser();
	return !!user.username;
};

export const logout = callback => {
	if (!isBrowser) return;
	UserLogout().then(
		res => {
			if (res.data.errorCode === 0) {
				setUser(prevState => ({ langCode: prevState.langCode }));
				callback();
			}
		},
		err => {
			if (err.response.status === 401) {
				setUser({});
				callback();
			}
		}
	);
};
