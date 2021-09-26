import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { fetchCart, addItemToCart, updateQuantity } from "../store/cart";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";

// Notice that we're exporting the SingleProduct component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.fetchProduct(this.props.match.params.id);
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      try {
        await this.props.fetchCart(this.props.user.id);
      } catch (error) {
        console.error(error);
      }
    }
  }

  addToCart(productId) {
    if (this.props.user.id) {
      const arrayOfIds = this.props.cart.map((product) => product.productId);
      if (arrayOfIds.includes(productId)) {
        const item = this.props.cart.filter(
          (item) => item.productId === productId
        )[0];
        item.quantity += 1;
        this.props.updateQuantity(item);
      } else {
        const item = {
          id: productId,
          userId: this.props.user.id,
          quantity: 1,
        };
        this.props.addItemToCart(item);
      }
    } else {
      if (!window.localStorage.cart) {
        window.localStorage.cart = JSON.stringify([]);
      }
      let cart = JSON.parse(window.localStorage.cart);
      let productInCart = cart.filter(
        (item) => +item.productId === productId
      )[0];
      if (productInCart) {
        const index = cart.indexOf(productInCart);
        productInCart.quantity += 1;
        cart[index] = productInCart;
      } else {
        const newProduct = {
          productId: productId,
          quantity: 1,
        };
        cart.push(newProduct);
      }
      window.localStorage.cart = JSON.stringify(cart);
    }
  }

  render() {
    const product = this.props.product;
    return (
      <div id="single-product">
        <div id="single-product-image">
          <img src={product.imageUrl} />
        </div>
        <div id="single-product-details">
          <div id="single-product-title">Name: {product.name}</div>
          <div id="single-product-description">
            Description:
            {product.description}
          </div>
          <div id="single-product-price">Price: ${product.price}</div>
          <button
            onClick={() => {
              return this.addToCart(product.id);
            }}
          >
            ADD TO CART
          </button>
          <EditProduct />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    fetchCart: (userId) => {
      dispatch(fetchCart(userId));
    },
    addItemToCart: (item) => {
      dispatch(addItemToCart(item));
    },
    updateQuantity: (item) => {
      dispatch(updateQuantity(item));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
