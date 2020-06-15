import React, { useContext, Component } from "react";
import { bankSlipPopBoxContext, i18nContext } from "../common/context";
import moment from "moment";
import ClipboardJS from "../../lib/clipboard.min";
import {
	api_UploadReceipt,
	api_SetDepositReceipt
} from "../../service/api/payment";

const GetUploadFileName = files => {
	let fullPath = files[0].name;
	var startIndex =
		fullPath.indexOf("\\") >= 0
			? fullPath.lastIndexOf("\\")
			: fullPath.lastIndexOf("/");
	var filename = fullPath.substring(startIndex);
	if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
		filename = filename.substring(1);
	}
	return filename;
};

class Modal extends Component {
	state = {};
	filebox = React.createRef();
	componentDidMount() {
		/* eslint-disable */
		this._clipboard = new ClipboardJS(".copyBtn");
		this._clipboard.on("success", e => {});
		this._clipboard.on("error", e => {});
		/* eslint-enable */
	}
	componentWillUnmount() {
		this._clipboard.destroy();
	}
	onCheckUpload = () => {
		let files = this.filebox.current.files;
		if (files[0]) {
			this.setState({
				UploadDisabled: files.length <= 0
			});
			this.props.EditField("picFileName", GetUploadFileName(files));
		}
	};
	onUploadFile = () => {
		let files = this.filebox.current.files;
		if (files.length > 0) {
			this.setState({ UploadDisabled: false });
			let formData = new FormData();
			formData.append("TransId", this.props.bankSlipPopBox.transId);
			formData.append("Receipt", files[0]);
			api_UploadReceipt(formData).then(response => {
				let result = response.data;
				if (result.errorCode === 0) {
					alert(this.props.i18n.lbl_UploadSuccess);
				} else {
					alert(result.message);
				}
			});
		} else {
			this.setState({ UploadDisabled: true });
		}
	};
	EditField = (column, e) => {
		this.props.EditField(column, e.target.value);
	};
	SeReceipt = () => {
		let bankSlipPopBox = this.props.bankSlipPopBox;
		api_SetDepositReceipt(
			bankSlipPopBox.transId,
			moment(bankSlipPopBox.depositTime).unix(),
			bankSlipPopBox.refId
		).then(res => {
			if (res.data.errorCode === 0) {
				this.props.handlePopBox();
			} else {
				alert(res.message);
			}
		});
	};
	render() {
		let bankSlipPopBox = this.props.bankSlipPopBox;
		let i18n = this.props.i18n;
		return (
			<div
				className={`bankSlip popUp${
					bankSlipPopBox.isOpen ? " open" : ""
				}`}>
				<div className="info infoAccount">
					<ul>
						<li>
							<div>
								<div className="bankLogo acb"></div>
								<span>{bankSlipPopBox.bankName}</span>
							</div>
							<a
								className="icon icon-new-tab clickBtn"
								target="_blank"
								rel="noreferrer noopener"
								href={bankSlipPopBox.bankSite}></a>
						</li>
						<li>
							<div>
								<span className="title">
									{i18n.lbl_BankAccountName}
								</span>
								<span>{bankSlipPopBox.accountName}</span>
							</div>
							<button
								className="icon icon-files-empty clickBtn copyBtn"
								data-clipboard-text={
									bankSlipPopBox.accountName
								}></button>
						</li>
						<li>
							<div>
								<span className="title">
									{i18n.lbl_BankNumber}
								</span>
								<span>{bankSlipPopBox.accountNo}</span>
							</div>
							<button
								className="icon icon-files-empty clickBtn copyBtn"
								data-clipboard-text={
									bankSlipPopBox.accountNo
								}></button>
						</li>
						<li>
							<div>
								<span className="title">
									{i18n.lbl_DepositAmount}
								</span>
								<span>{bankSlipPopBox.amount}</span>
							</div>
							<button
								className="icon icon-files-empty clickBtn copyBtn"
								data-clipboard-text={
									bankSlipPopBox.amount
								}></button>
						</li>
					</ul>
				</div>
				<span className="text">{i18n.lbl_AttachFile}</span>
				<div className="btn-group">
					<label className="fileUpload">
						<input
							type="file"
							ref={this.filebox}
							accept="image/*"
							onChange={this.onCheckUpload}
						/>
						<i className="icon icon-folder-upload"></i>
						{` ${
							this.props.bankSlipPopBox.picFileName ??
							"Select File"
						} `}
					</label>
					<button className="orange" onClick={this.onUploadFile}>
						{i18n.lbl_UploadFile}
					</button>
				</div>
				<span className="text">
					{i18n.lbl_DepositTime}{" "}
					<span className="text-org">({moment().format("Z")})</span>
				</span>
				<div className="inputBox">
					<i className="icon icon-calendar"></i>
					<input
						placeholder="Please submit your deposit time."
						type="datetime-local"
						value={this.props.bankSlipPopBox.depositTime ?? ""}
						onChange={this.EditField.bind(this, "depositTime")}
					/>
				</div>
				<span className="text">{i18n.lbl_RefnoToolTip}</span>
				<div className="inputBox">
					<i className="icon icon-pencil"></i>
					<input
						placeholder="Reference number"
						value={this.props.bankSlipPopBox.refId ?? ""}
						onChange={this.EditField.bind(this, "refId")}
					/>
				</div>
				<div className="btn-group">
					<button
						className="blue closePopup"
						onClick={this.props.handlePopBox}>
						{i18n.lbl_Cancel}
					</button>
					<button
						className="orange closePopup"
						onClick={this.SeReceipt}>
						{i18n.lbl_Submit}
					</button>
				</div>
			</div>
		);
	}
}

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const handlePopBox = () => {
		if (bankSlipPopBox.closeCallBack) {
			bankSlipPopBox.closeCallBack();
		}
		setbankSlipPopBox(() => ({ isOpen: false }));
	};

	const EditField = (column, value) => {
		setbankSlipPopBox(prevState => ({ ...prevState, [column]: value }));
	};

	return (
		<Modal
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			handlePopBox={handlePopBox}
			EditField={EditField}
		/>
	);
};

export default Panel;
