import React, { useContext } from "react";
import { bankSlipPopBoxContext, i18nContext } from "../common/context";
const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const handlePopBox = () => {
		setbankSlipPopBox(prevState => ({ ...prevState, isOpen: false }));
	};

	return (
		<div
			className={`bankSlip popUp${bankSlipPopBox.isOpen ? " open" : ""}`}>
			<div className="info infoAccount">
				<ul>
					<li>
						<div>
							<div className="bankLogo acb"></div>
							<span>{bankSlipPopBox.bankName}</span>
						</div>
						<button className="icon icon-new-tab clickBtn"></button>
					</li>
					<li>
						<div>
							<span className="title">
								{i18n.lbl_BankAccountName}
							</span>
							<span>{bankSlipPopBox.accountName}</span>
						</div>
						<button className="icon icon-files-empty clickBtn"></button>
					</li>
					<li>
						<div>
							<span className="title">{i18n.lbl_BankNumber}</span>
							<span>{bankSlipPopBox.accountNo}</span>
						</div>
						<button className="icon icon-files-empty clickBtn"></button>
					</li>
					<li>
						<div>
							<span className="title">
								{i18n.lbl_DepositAmount}
							</span>
							<span>{bankSlipPopBox.amount}</span>
						</div>
						<button className="icon icon-files-empty clickBtn"></button>
					</li>
				</ul>
			</div>
			<span className="text">{i18n.lbl_AttachFile}</span>
			<div className="btn-group">
				<label className="fileUpload">
					<input type="file" />
					<i className="icon icon-folder-upload"></i> Select File
				</label>
				<button className="orange">{i18n.lbl_UploadFile}</button>
			</div>
			<span className="text">
				{i18n.lbl_DepositTime}{" "}
				<span className="text-org">(+08:00)</span>
			</span>
			<div className="inputBox">
				<i className="icon icon-calendar"></i>
				<input placeholder="Please submit your deposit time." />
			</div>
			<span className="text">{i18n.lbl_RefnoToolTip}</span>
			<div className="inputBox">
				<i className="icon icon-pencil"></i>
				<input placeholder="Reference number" />
			</div>
			<div className="btn-group">
				<button className="blue closePopup" onClick={handlePopBox}>
					{i18n.lbl_Cancel}
				</button>
				<button className="orange closePopup">{i18n.lbl_Submit}</button>
			</div>
		</div>
	);
};

export default Panel;
