import React, { useState, useContext, Component } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext
} from "../common/context";
import productList from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { Redirect } from "@reach/router";

const Category = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const [redirect, setRedirect] = useState({
		redirect: false,
		path: ""
	});

	const clickGame = ({ tpId, gameId, path }) => {
		if (path) {
			setRedirect({
				redirect: true,
				path: path
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin === true,
				loginCallback: () => {
					setNav(defNavPanel.login);
				}
			});
		}
	};

	return redirect.redirect ? (
		<Redirect to={redirect.path} noThrow />
	) : (
		<CateGoryContent
			clickGame={clickGame}
			i18n={i18n}
			top={props.shortcutBarLocate?.bottom}
		/>
	);
};

class CateGoryContent extends Component {
	constructor(props) {
		super(props);
		this.state = { category: "sports" };
		this.mounted = false;
		this.RefItems = {};
		this.setCategory = false;
		productList.forEach(item => {
			this.RefItems[`${item.category}`] = {
				First: React.createRef(),
				Last: React.createRef()
			};
		});
		this.checkScrollTimer = null;
	}
	ScrollBarListener = () => {
		if (!this.setCategory) {
			this.setCategory = true;
			let currentCategory = null;
			Object.keys(this.RefItems).forEach(k => {
				let item =
					this.RefItems[k].Last.current ??
					this.RefItems[k].First.current;
				let x = item.getBoundingClientRect();

				if (
					x.bottom >= this.props.top + 50 &&
					currentCategory === null
				) {
					currentCategory = k;
				}
			});

			if (this.state.category !== currentCategory) {
				if (this.mounted) {
					this.setState(
						{ category: currentCategory },
						() => (this.setCategory = false)
					);
				}
			} else {
				this.setCategory = false;
			}
		}
	};
	checkScrolling = () => {
		if (this.checkScrollTimer !== null) {
			clearTimeout(this.checkScrollTimer);
		}
		this.checkScrollTimer = setTimeout(this.ScrollBarListener, 150);
	};
	componentWillUnmount() {
		this.mounted = false;
		window.removeEventListener("mousewheel", this.ScrollBarListener, false);
		window.removeEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		window.removeEventListener("scroll", this.checkScrolling, false);
	}
	componentDidMount() {
		this.mounted = true;
		window.addEventListener("mousewheel", this.ScrollBarListener, false);
		window.addEventListener("touchmove", this.ScrollBarListener, {
			passive: false
		});
		window.addEventListener("scroll", this.checkScrolling, false);
	}
	selectCategory = _category => {
		if (this.state.category !== _category) {
			this.setState({ category: _category });
		}
		let firstItem = this.RefItems[
			_category
		].First.current.getBoundingClientRect();

		const offset_y = -this.props.top;
		const y = firstItem.top + window.pageYOffset + offset_y;
		window.scrollTo({ top: y, behavior: "smooth" });
	};
	render() {
		let sideBarItems = [];
		let products = [];

		productList.forEach(item => {
			let _open = this.state.category === item.category;
			sideBarItems.push(
				<CategoryItem
					key={`category-${item.category}`}
					categoryIcon={item.categoryIcon}
					onClick={
						!item._blank
							? this.selectCategory.bind(null, item.category)
							: this.props.clickGame.bind(this, { ...item })
					}
					isOpen={`${_open ? " open" : ""}`}
					translation={this.props.i18n[item.translateKey]}
				/>
			);

			let content = item.items.map((subItem, idx) => {
				let refItem =
					idx === 0
						? this.RefItems[item.category].First
						: idx === item.items.length - 1
						? this.RefItems[item.category].Last
						: null;
				return (
					<ProductItem
						_ref={refItem}
						key={`product-tpId_${subItem.tpId}-gameId_${subItem.gameId}`}
						clickGame={this.props.clickGame.bind(this, {
							...subItem
						})}
						img={subItem.img}
						spanText={this.props.i18n[subItem.spanTextKey]}
						icon={subItem.icon}
					/>
				);
			});

			if (item.className) {
				products.push(
					<div
						key={`productGroup-${item.category}`}
						className={item.className}>
						{content}
					</div>
				);
			} else {
				products = [...products, ...content];
			}
		});

		return (
			<div className="content">
				<div className="sideBar">{sideBarItems}</div>
				<div className="gameList">{products}</div>
			</div>
		);
	}
}

const CategoryItem = props => {
	return (
		<button
			className={`icon icon-${props.categoryIcon}${props.isOpen}`}
			onClick={props.onClick}>
			<div>{props.translation}</div>
		</button>
	);
};

const ProductItem = props => {
	return (
		<a onClick={props.clickGame} ref={props._ref}>
			<img src={props.img} alt={props.icon} />
			{props.spanText ? (
				<span className={`icon icon-${props.icon}`}>
					{props.spanText}
				</span>
			) : null}
		</a>
	);
};

export default Category;
