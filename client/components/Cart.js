import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { fetchUserByName } from "../store/singleUser";

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    if (window.localStorage.token) {
      try {
        await this.props.loadUser(this.props.username);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      if (window.localStorage.token) {
        try {
          await this.props.loadUser(this.props.username);
          await this.props.loadCart(this.props.user.id);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  render() {
    const user = this.props.user;
    const cart = this.props.cart;
    if (!window.localStorage.token) {
      if (!window.localStorage.cart) {
        /*  We can not store  arrays in local storage */
        window.localStorage.cart = JSON.stringify([]);
      }
      return (
        <>
          <h1>Guest Cart</h1>
          <div id="cart" className="flex-box">
            {JSON.parse(window.localStorage.cart).map((item, key) => {
              console.log(item);
              return (
                <h4 key={key}>
                  <p>ProductId: {item.productId}</p>
                  <p>Quantity: {item.quantity}</p>
                  <br />
                </h4>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1>{user.username}'s Cart</h1>
          <div id="cart" className="flex-box">
            {cart.map((item, key) => {
              console.log(item);
              return (
                <h4 key={key}>
                  <p>ProductId: {item.productId}</p>
                  <p>Quantity: {item.quantity}</p>
                  <br />
                </h4>
              );
            })}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  username: state.auth.username,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: (userId) => dispatch(fetchCart(userId)),
  loadUser: (username) => dispatch(fetchUserByName(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
