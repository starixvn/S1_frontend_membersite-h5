import config from "../config";

export const _ACTION_TYPE = {
	blank: 1,
	redirect: 2
};

export const GET_ENTER_PAGE = (
	langId,
	tpId,
	gameId,
	isLogin,
	loginCallback
) => {
	let homeUrl = "";
	let signupUrl = "";
	let LoginUrl = "";
	let entPageUrl = `${config.apiURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}`;
	let result = setResult("", true, _ACTION_TYPE.blank);

	if (tpId === 1) {
		if (gameId === 43) {
			result = setResult("", true, _ACTION_TYPE.blank, tpId, gameId);
		} else if (gameId < 100) {
			result = setResult("", false, _ACTION_TYPE.redirect, tpId, gameId);
		} else if (gameId === 161 || gameId === 180) {
			result = setResult("", false, _ACTION_TYPE.redirect, tpId, gameId);
		} else if (gameId >= 200) {
			result = setResult("", true, _ACTION_TYPE.blank, tpId, gameId);
		}
	}

	if (!isLogin && result.needLogin) {
		loginCallback();
	} else if (result.actionType === _ACTION_TYPE.blank) {
		window.open(
			entPageUrl,
			result.windowKey,
			"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
		);
	} else if (result.actionType === _ACTION_TYPE.redirect) {
		window.location.href = entPageUrl;
	}
};

const setResult = (url, needLogin, actionType, tpId, gameId) => {
	return {
		url: url,
		needLogin: needLogin,
		actionType: actionType,
		windowKey: tpId === 1 ? `Tp_${tpId}_${gameId}` : `Tp_${tpId}`
	};
};
