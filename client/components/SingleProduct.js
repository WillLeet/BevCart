import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addItemToCart, updateQuantity } from "../store/cart";
import { fetchCurrentOrder } from "../store/order";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { initializeOrder } from "../store/order";

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
      await this.props.fetchCart(this.props.user.id);
    } catch (err) {
      console.error(err);
    }
  }

  notify(name) {
    toast(`${name} added to the cart!`);
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
      const arrayOfIds = this.props.order.orderedproducts.map(
        (product) => product.productId
      );
      if (arrayOfIds.includes(productId)) {
        const item = this.props.order.orderedproducts.filter(
          (item) => item.productId === productId
        )[0];
        item.quantity += 1;
        this.props.updateQuantity(item);
      } else {
        const item = {
          id: productId,
          orderId: this.props.order.id,
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
    if (product.name) {
      return (
        <div id="single-product">
          <div id="single-product-image">
            <img src={product.imageUrl} className="image-from-product" />
          </div>
          <div id="single-product-details">
            <div id="single-product-title" className="text-single-product">
              Name: {product.name}
            </div>
            <div
              id="single-product-description"
              className="text-single-product"
            >
              Description:
              {product.description}
            </div>
            <div id="single-product-price" className="text-single-product">
              Price: ${product.price}
            </div>
            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                this.notify(product.name);
                return this.addToCart(product.id);
              }}
            >
              ADD TO CART
            </button>
            <EditProduct />
          </div>
        </div>
      );
    } else {
      return (
        <ClipLoader
          color="aqua"
          size={150}
          loading={true}
          speedMultiplier={1.5}
        />
      );
    }
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
    order: state.order[0],
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    fetchCart: (userId) => {
      dispatch(fetchCurrentOrder(userId));
    },
    addItemToCart: (item) => {
      dispatch(addItemToCart(item));
    },
    updateQuantity: (item) => {
      dispatch(updateQuantity(item));
    },
    initializeOrder: (userId) => {
      dispatch(initializeOrder(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
