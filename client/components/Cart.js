import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQuantity, removeItemFromCart } from "../store/cart";
import { fetchCurrentOrder } from "../store/order";
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
  }
  async componentDidMount() {
    if (window.localStorage.token) {
      try {
        await this.props.loadAuth();
        if(this.props.user.id){
        await this.props.loadCart(this.props.user.id);
        console.log(this.props.order);
        this.updateState();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  /*
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
      //Because we want to have quantity on each product
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
  */

  async componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (window.localStorage.token && this.props.user.id) {
        try {
          await this.props.loadCart(this.props.user.id);
          if(this.props.order.orderedproducts){this.setState({products: this.props.order.orderedproducts})}
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


  async updateState() {
    try {
      this.setState({products: this.props.order.orderedproducts});
    } catch (err) {
      console.error(err);
    }
  }


  render() {
    const user = this.props.user;
    const productsInCart = this.state.products;
    const total = productsInCart.reduce((acc, orderedproduct) => {
      console.log(orderedproduct);
      acc += orderedproduct.product.price * orderedproduct.quantity;
      return acc;
    }, 0);

    if (!window.localStorage.token) {
      return (
        <>
          <GuestCart history={this.props.history} />
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
                  <h1>name: {item.product.name}</h1>
                  <img src={item.product.imageUrl} />
                  <div>Quantity: {item.quantity}</div>
                  <button
                    type="button"
                    value={item.orderId}
                    onClick={() => {
                      item.quantity += 1;
                      this.updateState();
                      this.props.updateQuantity(item);
                      this.updateState();
                    }}
                  >
                    Increase
                  </button>
                  <button
                    type="button"
                    value={item.orderId}
                    onClick={async () => {
                      item.quantity -= 1;
                      if (item.quantity === 0) {
                         await this.props.removeProduct(
                          item.orderId,
                          item.productId
                        );
                        await this.props.loadCart(this.props.user.id);
                      } else {
                        await this.props.updateQuantity(item);
                      }
                      this.updateState();
                    }}
                  >
                    Decrease
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                       await this.props.removeProduct(
                        item.orderId,
                        item.productId
                      );
                      await this.props.loadCart(this.props.user.id);
                      this.updateState();
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            })}
          </div>
          <h1>Total: ${total.toFixed(2)}</h1>
          <button onClick={()=>this.props.history.push('/payment')}>Checkout</button>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  user: state.auth,
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  loadAuth: () => dispatch(me()),
  loadCart: (userId) => dispatch(fetchCurrentOrder(userId)),
  loadProduct: (productId) => dispatch(fetchProduct(productId)),
  updateQuantity: (product) => dispatch(updateQuantity(product)),
  removeProduct: (userId, productId) =>
    dispatch(removeItemFromCart(userId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
