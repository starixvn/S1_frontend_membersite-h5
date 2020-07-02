import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import { api_UploadCustPhotoId } from "../../service/api/accountStrict";
import { Redirect } from "@reach/router";
import path from "../../path";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [file, setFile] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	const onChangeUpload = e => {
		let newFile = e.target.files[0];
		setFile(newFile);
	};

	const onUploadFile = () => {
		if (file !== null && !processing) {
			setProcessing(true);
			let formData = new FormData();
			formData.append("PhotoId", file);
			api_UploadCustPhotoId(formData).then(
				response => {
					if (isMountedRef.current) {
						let res = response.data;
						if (res.errorCode === 0) {
							setRedirectPath(`/${path.kycWaiting.root}`);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.message
							});
						}
						setProcessing(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		}
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<div className="step">
				<div className="stepLine">
					<div></div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark"></div>
					</div>
				</div>
				<div className="circle">
					<div>
						<div>2</div>
					</div>
				</div>
			</div>
			<span className="text-org">{i18n.lbl_SubmitPhotoIdHint}</span>
			<div className="btn-group">
				<label className="fileUpload">
					<input
						type="file"
						accept="image/*"
						onChange={onChangeUpload}
					/>
					<i className="icon icon-folder-upload"></i>{" "}
					{`${file ? file.name : i18n.msg_SelectFile}`}
				</label>
				<button className="orange" onClick={onUploadFile}>
					{i18n.lbl_UploadPhotoId}
				</button>
			</div>
			<span className="text">{i18n.lbl_KYCSubmitHint}</span>
			<div className="text">
				<ul>
					<li>{i18n.lbl_NationalIdentityCard}</li>
					<li>{i18n.lbl_Passport}</li>
					<li>{i18n.lbl_DrivingLicense}</li>
					<li>{i18n.lbl_BirthCertificate}</li>
				</ul>
			</div>
		</>
	);
};
