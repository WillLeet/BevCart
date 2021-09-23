import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!window.localStorage.token) {
      return (
        <>
          <h1>Guest Cart</h1>
          <div id="cart" className="flex-box">
            <h1>Cart info can go here</h1>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1>{this.props.username}'s Cart</h1>
          <div id="cart" className="flex-box">
            <h1>Cart info can go here</h1>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(fetchCart),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
