import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchCart } from "../store/cart";

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="cart" className="flex-box">
        <h1>Cart info can go here</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  cart: state.cart;
};

const mapDispatchToProps = (dispatch) => {
  loadCart: () => dispatch(fetchCart);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
