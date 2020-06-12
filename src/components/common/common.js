export const getUrlParameter = name => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
	var results = regex.exec(window.location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const number_format = (n, IsConvertRequired = false) => {
	if (!isNaN(n) && IsConvertRequired) {
		n /= 1000;
	}

	n += "";
	var arr = n.split(".");
	var re = /(\d{1,3})(?=(\d{3})+$)/g;
	return (
		arr[0].replace(re, "$1,") +
		(arr.length == 2 ? "." + arr[1] : "") +
		(IsConvertRequired ? " ('000)" : "")
	);
};

const _isConvertList = {
	51: true,
	15: true
};

export const isConvert = currencyId => {
	return _isConvertList[currencyId] === true;
};

export const checkAmount = (amount, minAmount, maxAmount, _isConvert, i18n) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let num_Amount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			num_Amount *= 1000;
		}
		if (num_Amount <= 0) {
			status = 2;
			msg = i18n.lbl_AmountTooltip;
		} else if (
			minAmount !== 0 &&
			maxAmount !== 0 &&
			(num_Amount > maxAmount || num_Amount < minAmount)
		) {
			status = 2;
			msg =
				number_format(num_Amount, _isConvert) +
				" " +
				i18n.lbl_NotinLimit;
		}
	}

	return { status: status, msg: msg };
};
