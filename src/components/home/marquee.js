import React, { Component, useContext, createRef } from "react";
import { api_GetAnnouncement } from "../../service/api/message";
import PropTypes from "prop-types";
import {
	popBoxContext,
	userInfoContext,
	navContext,
	defPanel
} from "../common/context";
import { GET_LANG_ID } from "../../service/language";

const Panel = () => {
	const { nav, setNav } = useContext(navContext);

	const OpenLoginPanel = () => {
		setNav(() => {
			return defPanel.login;
		});
	};

	const { popBox, setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	let langId = GET_LANG_ID(userInfo.langId);
	return (
		<Marquee
			nav={nav}
			OpenLoginPanel={OpenLoginPanel}
			setPopBox={setPopBox}
			userIsLogin={userInfo.isLogin}
			langId={langId}
			popBoxIsOpen={popBox.isOpen}
		/>
	);
};

class Marquee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datas: [],
			hover: false,
			pos: null,
			initWidth: 0,
			nav: this.props.nav
		};
		this.unmounted = false;
		this.marquee = createRef();
		this.content = createRef();
	}
	componentDidMount = () => {
		this.GetAnnouncement();
		this.intervalId = setInterval(this.GetAnnouncement, 60000);
	};
	SetPos = () => {
		if (
			!this.unmounted &&
			!this.props.popBoxIsOpen &&
			this.state.prev !== null
		) {
			let style = window.getComputedStyle(this.content.current, null);
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
		if (this.state.pos === null && !this.unmounted) {
			let style = window.getComputedStyle(this.marquee.current, null);
			let pos = parseFloat(style.width);

			this.setState({ pos: -pos, initWidth: pos });
		}
	};
	GetAnnouncement = () => {
		api_GetAnnouncement(this.props.langId).then(res => {
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

				if (!this.unmounted) {
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
			}
		});
	};
	ClickMarquee = item => {
		if (this.props.userIsLogin) {
			let content = item.content.split("\\n").join("　");

			this.props.setPopBox({
				isOpen: true,
				title: item.subject,
				content: content
			});
		} else {
			this.props.OpenLoginPanel();
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
				<div ref={this.content} className="marquee-box">
					<div
						className="marquee-run"
						ref={this.marquee}
						style={style}>
						{rows}
					</div>
				</div>
			</div>
		);
	}
}

Marquee.defaultProps = {
	langId: `en`,
	userIsLogin: true
};

Marquee.propTypes = {
	langId: PropTypes.string,
	userIsLogin: PropTypes.bool,
	setPopBox: PropTypes.func,
	popBoxIsOpen: PropTypes.bool
};

export default Panel;
