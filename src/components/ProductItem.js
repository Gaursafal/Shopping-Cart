import React from 'react';
import styles from "../Css/ProductItem.module.css"

export default class ProductItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0
		}
	}

	handleInputChange = event =>
		this.setState({ [event.target.name]: event.target.value })

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id] : 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity;
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	render() {
		const { product } = this.props;
		return (
			<div style={{ float : "left" }}>
				<div className="card" className = {styles.card}>
					<div className="card-body float-left">
						<h4 className="card-title">{product.name}</h4>
						<img width="300px" src={product.image} alt="" />
							<p className="card-text">{product.description}</p>
							<h4 className="card-text">Price: ₹{product.price}</h4>
							<span className="card-text">Available Quantity:{product.available_quantity}</span>

							{product.available_quantity >= 1 ?
								<div>
									<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} style={{ width: "60px", marginRight: "10px", borderRadius: "5px", paddingBottom: "4px" }} />
									<button className="btn btn-sm btn-warning" onClick={this.addToCart}>Add to cart</button>
								</div> :
								<p className="text-danger"> Out of Stock </p>
							}
					</div>
				</div>
			</div>
		)
	}
}
