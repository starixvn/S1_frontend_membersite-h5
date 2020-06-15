import React, { useEffect, useState, useContext } from "react";
import { i18nContext, popBoxContext } from "../common/context";
import {
	api_GetMsgList,
	api_GetMsgContent,
	api_DelMsg
} from "../../service/api/account";
import moment from "moment";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getMsgList, setGetMsgList] = useState([]);
	const [getMsgContent, setGetMsgContent] = useState([]);
	const [openContentState, setOpenContentState] = useState(null);
	const [checkboxListState, setcheckboxListState] = useState([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);

	useEffect(() => {
		GetMsgList();
	}, []);

	const GetMsgList = () => {
		api_GetMsgList(1).then(res => {
			if (res.data.errorCode === 0) {
				let data = res.data.data;
				if (data !== null) {
					setGetMsgList(data);
				}
			}
		});
	};

	const openContent = (id, flag) => {
		if (openContentState === id) {
			setOpenContentState(null);
		} else {
			setOpenContentState(id);
			api_GetMsgContent(id).then(res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					setGetMsgContent(data);

					if (flag !== true) {
						setGetMsgList(prevState => {
							return prevState.map(x => {
								if (x.id === id) {
									x.flag = true;
								}
								return x;
							});
						});
					}
				}
			});
		}
	};

	const checkboxHandler = item => {
		let currIds = checkboxListState.includes(item.id)
			? checkboxListState.filter(_item => _item !== item.id)
			: [...checkboxListState, item.id];
		setcheckboxListState(currIds);
		setIsSelectedAll(currIds.length === getMsgList.length);
	};

	const selectAll = () => {
		let allId = getMsgList.map(item => {
			return item.id;
		});
		if (checkboxListState.length === getMsgList.length) {
			setcheckboxListState([]);
			setIsSelectedAll(false);
		} else {
			setcheckboxListState(allId);
			setIsSelectedAll(true);
		}
	};

	const delMsg = () => {
		const DelMsg = () => {
			api_DelMsg(checkboxListState).then(res => {
				if (res.data.errorCode === 0) {
					GetMsgList();
				}
			});
			setPopBox({ isOpen: false });
		};

		const closePopBox = () => {
			setPopBox({ isOpen: false });
		};

		if (checkboxListState.length !== 0) {
			setPopBox({
				isOpen: true,
				title: "",
				content: i18n["lbl_CheckConfirm"],
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={closePopBox}>
							{i18n["lbl_Cancel"]}
						</button>
						<button className="orange" onClick={DelMsg}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	let arr = getMsgList?.map(item => {
		let _open = openContentState === item.id;
		let _checked = checkboxListState.includes(item.id);

		return (
			<Item
				key={`msgList-${item.id}`}
				showDate={item.createTime}
				title={item.title}
				onClick={openContent.bind(null, item.id, item.flag)}
				content={getMsgContent.content}
				isOpen={_open}
				isRead={item.flag}
				onChange={checkboxHandler.bind(null, item)}
				isChecked={_checked}
			/>
		);
	});

	return (
		<>
			<div className="functionList">
				<label className="checkbox">
					<input type="checkbox" onChange={selectAll} />
					<i
						className={`icon icon-checkbox ${
							isSelectedAll ? "open" : ""
						}`}></i>
					{i18n["lbl_SelectAll"]}
				</label>
				<div className="smallBtn-group">
					<button
						className="icon icon-bin clickBtn"
						onClick={delMsg}></button>
					<button
						className="icon icon-spinner11 clickBtn"
						onClick={GetMsgList}></button>
				</div>
			</div>
			{arr}
		</>
	);
};

const Item = props => {
	return (
		<div className={`account ${props.isRead ? " read" : ""}`}>
			<div className="info">
				<label className="checkbox">
					<input type="checkbox" onChange={props.onChange} />
					<i
						className={`icon icon-checkbox${
							props.isChecked ? " open" : ""
						}`}></i>
				</label>
				<div className="introduction">
					<span className="title">{props.title}</span>
					<span>
						{moment(props.showDate).format("MM/DD/YYYY h:mm:ss A")}
					</span>
				</div>
				<button
					className={`icon icon-circle-right ${
						props.isOpen ? " open" : ""
					}`}
					onClick={props.onClick}></button>
			</div>
			<div className={`content ${props.isOpen ? " open" : ""}`}>
				<pre>{props.content}</pre>
			</div>
		</div>
	);
};

export default Panel;
