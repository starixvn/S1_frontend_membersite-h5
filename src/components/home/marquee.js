import React, { Component, useContext } from "react";
import { GetAnnouncement as GetAnnouncementAPI } from "../../service/api/message";
import PropTypes from "prop-types";
import { popBoxContext } from "../context/popBox";
import { userInfoContext } from "../context/userInfo";
import { GetLangId } from "../../service/language";

const Panel = () => {
	const { popBox, setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	let langCode = GetLangId(userInfo.langCode);
	return (
		<Marquee
			setPopBox={setPopBox}
			userIsLogin={true}
			langCode={langCode}
			popBoxIsOpen={popBox.isOpen}
		/>
	);
};

class Marquee extends Component {
	constructor(props) {
		super(props);
		this.state = { datas: [], hover: false, pos: null, initWidth: 0 };
		this.ClickMarquee = this.ClickMarquee.bind(this);
		this.GetAnnouncement = this.GetAnnouncement.bind(this);
		this.unmounted = false;
	}
	componentDidMount() {
		this.GetAnnouncement();
		this.intervalId = setInterval(this.GetAnnouncement, 60000);
	}
	SetPos = () => {
		if (
			!this.unmounted &&
			!this.props.popBoxIsOpen &&
			this.state.prev !== null
		) {
			let style = window.getComputedStyle(this.refs.content, null);
			let outerBox = parseFloat(style.width);

			this.setState(prev => {
				if (prev.pos >= outerBox) {
					return { pos: -prev.initWidth };
				} else {
					return { pos: prev.pos + 1.5 };
				}
			});
		}
	};
	componentWillUnmount = () => {
		this.unmounted = true;
		clearInterval(this.intervalId_Pos);
	};
	componentDidUpdate = () => {
		if (this.state.pos === null) {
			let style = window.getComputedStyle(this.refs.marquee, null);
			let pos = parseFloat(style.width);

			this.setState({ pos: -pos, initWidth: pos });
		}
	};
	GetAnnouncement() {
		GetAnnouncementAPI(this.props.langCode).then(res => {
			let resData = res.data.data;
			let stateData = this.state.datas;
			let upd = false;
			if (resData.length !== 0 && stateData.length !== 0) {
				for (let d in resData) {
					let find = stateData.find(
						x =>
							x.id === resData[d].id &&
							x.subject === resData[d].subject &&
							x.content === resData[d].content
					);

					if (!find) {
						upd = true;
						break;
					}
				}
			} else {
				upd = true;
			}

			if (upd) {
				if (this.intervalId_Pos === undefined) {
					this.intervalId_Pos = setInterval(this.SetPos, 25);
				}

				this.setState({
					datas: res.data.data.map(item => {
						return {
							...item,
							subject: item.subject,
							content: item.content
						};
					})
				});
			}
		});
	}
	ClickMarquee = item => {
		if (this.props.userIsLogin) {
			let content = item.content.split("\\n").join("　");

			this.props.setPopBox({
				isOpen: true,
				title: item.subject,
				content: content
			});
		} else {
			console.log("show login");
		}
	};
	render() {
		let rows = this.state.datas.map(item => {
			return (
				<button
					key={`announcement-${item.id}`}
					style={{ paddingLeft: "2rem" }}
					onClick={this.ClickMarquee.bind(this, item)}>
					{item.subject}
				</button>
			);
		});

		let style = this.state.pos === null ? {} : { right: this.state.pos };
		return (
			<div id="Marquee">
				<div className="icon icon-marquee"></div>
				<div ref="content" className="marquee-box">
					<div className="marquee-run" ref="marquee" style={style}>
						{rows}
					</div>
				</div>
			</div>
		);
	}
}

Marquee.defaultProps = {
	langCode: `en`,
	userIsLogin: true
};

Marquee.propTypes = {
	langCode: PropTypes.string,
	userIsLogin: PropTypes.bool,
	setPopBox: PropTypes.func,
	popBoxIsOpen: PropTypes.bool
};

export default Panel;
