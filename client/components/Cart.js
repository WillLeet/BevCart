import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, updateQuantity, removeItemFromCart } from "../store/cart";
import { fetchProduct } from "../store/singleProduct";
import GuestCart from "./GuestCart";
import { me } from "../store/auth";
/**
 * COMPONENT
 */

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.updateState = this.updateState.bind(this);
    this.setCartToState = this.setCartToState.bind(this);
  }
  async componentDidMount() {
    if (window.localStorage.token) {
      try {
        await this.props.loadAuth();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async setCartToState() {
    await this.props.loadCart(this.props.user.id);
    const products = (
      await Promise.all(
        this.props.cart.map((product) => {
          return this.props.loadProduct(product.productId);
        })
      )
    ).map((product) => {
      const prod = product.product;
      /* Because we want to have quantity on each product */
      const _prod = this.props.cart.filter(
        (item) => item.productId === prod.id
      )[0];
      prod.quantity = _prod.quantity;
      prod.productId = _prod.productId;
      if (this.props.user) {
        prod.userId = this.props.user.id;
      }
      return prod;
    });

    this.setState({
      products,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (window.localStorage.token && this.props.user.id) {
        try {
          this.setCartToState();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async updateState() {
    try {
      this.setCartToState();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const user = this.props.user;
    const productsInCart = this.state.products;
    const total = productsInCart.reduce((acc, product) => {
      acc += product.price * product.quantity;
      return acc;
    }, 0);

    if (!window.localStorage.token) {
      return (
        <>
          <GuestCart />
        </>
      );
    } else {
      return (
        <>
          <h1>{user.username}'s Cart</h1>
          <div id="cart" className="flex-box">
            {productsInCart.map((item, key) => {
              return (
                <div key={key}>
                  <h1>name: {item.name}</h1>
                  <img src={item.imageUrl} />
                  <div>Quantity: {item.quantity}</div>
                  <button
                    type="button"
                    value={item.userId}
                    onClick={() => {
                      item.quantity += 1;
                      this.props.updateQuantity(item);
                    }}
                  >
                    Increase
                  </button>
                  <button
                    type="button"
                    value={item.userId}
                    onClick={async () => {
                      item.quantity -= 1;
                      if (item.quantity === 0) {
                        await this.props.removeProduct(
                          item.userId,
                          item.productId
                        );
                        await this.updateState();
                      } else {
                        this.props.updateQuantity(item);
                      }
                    }}
                  >
                    Decrease
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await this.props.removeProduct(
                        item.userId,
                        item.productId
                      );
                      await this.updateState();
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            })}
          </div>
          <h1>Total: ${total.toFixed(2)}</h1>
          <button>Checkout</button>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  user: state.auth,
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  loadAuth: () => dispatch(me()),
  loadCart: (userId) => dispatch(fetchCart(userId)),
  loadProduct: (productId) => dispatch(fetchProduct(productId)),
  updateQuantity: (product) => dispatch(updateQuantity(product)),
  removeProduct: (userId, productId) =>
    dispatch(removeItemFromCart(userId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
