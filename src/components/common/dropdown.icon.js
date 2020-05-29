import React, { Component, createRef } from "react";

export class IconDropdown extends Component {
	constructor(props) {
		super(props);
		document.addEventListener("mousedown", this.handleClickOutside);
		this.state = {
			isOpen: false
		};
		this.wrapper = createRef(null);
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	ClickDropdown = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	SelectItem = value => {
		this.setState({ isOpen: false });
		this.props.onSelectItem(value);
	};

	render() {
		let arr = this.props.options.map((item, i) => {
			return (
				<Item
					key={`${this.props.mainKey}-${i}`}
					langId={this.props.options[i].langId}
					language={this.props.options[i].language}
					iconClassName={this.props.options[i].iconClassName}
					value={i}
					onClick={this.SelectItem.bind(null, i)}
				/>
			);
		});
		return (
			<div
				ref={this.wrapper}
				className={`dropdown ${this.state.isOpen ? "open" : ""}`}
				onClick={this.ClickDropdown}>
				<a className="btn">
					<i
						className={
							this.props.options[this.props.userValue]
								?.iconClassName
						}></i>
					<span className="text">
						{this.props.options[this.props.userValue]?.language}
					</span>
				</a>
				<div className="dropdown-container">{arr}</div>
			</div>
		);
	}
}

const Item = props => {
	return (
		<div className="dropdown-item" onClick={props.onClick}>
			<i className={props.iconClassName}></i>
			<span className="text">{props.language}</span>
		</div>
	);
};
export default IconDropdown;
