import React, { Component } from "react";

export default class GuestCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!window.localStorage.cart) {
      /*  We can not store  arrays in local storage */
      window.localStorage.cart = JSON.stringify([]);
    }
    return (
      <>
        <h1>Guest Cart</h1>
        <div id="cart" className="flex-box">
          {JSON.parse(window.localStorage.cart).map((item, key) => {
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
