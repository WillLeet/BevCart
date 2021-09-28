import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";

class GuestCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.setCartToState = this.setCartToState.bind(this);
  }

  async setCartToState(cart) {
    const products = (
      await Promise.all(
        cart.map((product) => {
          return this.props.fetchProduct(product.productId);
        })
      )
    ).map((product) => {
      const prod = product.product;
      /* Because we want to have quantity on each product */
      const _prod = cart.filter((item) => +item.productId === prod.id)[0];
      prod.quantity = _prod.quantity;
      return prod;
    });

    this.setState({
      products,
    });
  }

  async componentDidMount() {
    const cart = JSON.parse(window.localStorage.cart);
    try {
      this.setCartToState(cart);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!window.localStorage.cart) {
      /*  We can not store  arrays in local storage */
      window.localStorage.cart = JSON.stringify([]);
    }
    let cart = JSON.parse(window.localStorage.cart);
    const productsInCart = this.state.products;
    const total = productsInCart.reduce((acc, product) => {
      acc += product.price * product.quantity;
      return acc;
    }, 0);

    return (
      <>
        <h1>Guest Cart</h1>
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
                    const _item = cart.filter((prod) => {
                      return +prod.productId === item.id;
                    })[0];
                    const index = cart.indexOf(_item);
                    _item.quantity += 1;
                    cart[index] = _item;
                    window.localStorage.cart = JSON.stringify(cart);
                    this.setCartToState(cart);
                  }}
                >
                  Increase
                </button>
                <button
                  type="button"
                  value={item.userId}
                  onClick={() => {
                    const _item = cart.filter((prod) => {
                      return +prod.productId === item.id;
                    })[0];
                    const index = cart.indexOf(_item);
                    _item.quantity -= 1;
                    if (_item.quantity === 0) {
                      console.log(cart);
                      cart = cart.filter((prodd) => {
                        return +prodd.productId !== item.id;
                      });
                      console.log(cart);
                    } else {
                      cart[index] = _item;
                    }
                    window.localStorage.cart = JSON.stringify(cart);
                    this.setCartToState(cart);
                  }}
                >
                  Decrease
                </button>
                <button
                  type="button"
                  onClick={() => {
                    cart = cart.filter((prodd) => {
                      return +prodd.productId !== item.id;
                    });
                    window.localStorage.cart = JSON.stringify(cart);
                    this.setCartToState(cart);
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

const mapStateToProps = (state) => ({
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (productId) => {
    return dispatch(fetchProduct(productId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart);
