import React, { useState, useContext } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import { api_ResetPassword } from "../../service/api/accountStrict";
import Inputbox from "../common/inputbox.password";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [newPsw, setNewPsw] = useState("");
	const [pswState, setPswState] = useState(false);
	const [warning, setWarning] = useState({ status: false, msg: "" });

	const showPswHandler = () => {
		setPswState(!pswState);
	};

	const EditField = e => {
		let val = e.target.value;
		setNewPsw(val);
	};

	const checkPswHandler = e => {
		let val = e.target.value;
		let checked = true;
		let message = "";
		const regx = /^[a-zA-Z0-9@$*!%#?&]*$/;

		if (val === "") {
			checked = false;
			message = i18n.msg_PasswordReq;
		} else if (val != null) {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				message = i18n.msg_PasswordLength;
			} else if (!regx.test(val)) {
				checked = false;
				message = i18n.msg_PasswordVaildate;
			}
		}

		setWarning({ status: !checked, msg: message });
	};

	const clickSubmit = () => {
		if (newPsw === "") {
			setWarning({ status: true, msg: i18n.msg_PasswordVaildate });
		} else if (warning.status === true) {
			api_ResetPassword({ NewPassword: newPsw }).then(
				res => {
					if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
				},
				err => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	};

	return (
		<>
			<Inputbox
				icon="icon-key"
				inputType={`${!pswState ? "password" : "text"}`}
				placeholder={i18n.lbl_Password}
				value={newPsw}
				onChange={EditField.bind(null)}
				onBlur={checkPswHandler.bind(null)}
				Warning={warning}
				showPsw={pswState}
				showPswHandler={showPswHandler}
				ClassName="LoginRule"
			/>
			<div className="btn-group">
				<button className="orange" onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};
