import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, updateQuantity, removeItemFromCart } from "../store/cart";
import { fetchUserByName } from "../store/singleUser";
import { fetchProduct } from "../store/singleProduct";
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
        await this.props.loadUser(this.props.username);
      } catch (err) {
        console.error(err);
      }
    } else {
      JSON.parse(window.localStorage.cart).forEach((product) => {
        this.setState({ products: [...this.state.products, product] });
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      if (window.localStorage.token) {
        try {
          await this.props.loadUser(this.props.username);
        } catch (err) {
          console.error(err);
        }
      }
    }
    if (prevProps.user !== this.props.user) {
      if (window.localStorage.token && this.props.user.id) {
        try {
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
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async updateState() {
    try {
      const products = (
        await Promise.all(
          this.props.cart.map(async (product) => {
            return await this.props.loadProduct(product.productId);
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
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const user = this.props.user;
    const productsInCart = this.state.products;

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
                </div>
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
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: (userId) => dispatch(fetchCart(userId)),
  loadUser: (username) => dispatch(fetchUserByName(username)),
  loadProduct: (productId) => dispatch(fetchProduct(productId)),
  updateQuantity: (product) => dispatch(updateQuantity(product)),
  removeProduct: (userId, productId) =>
    dispatch(removeItemFromCart(userId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
