import React from "react";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/products";
import { Link } from "react-router-dom";
import NewProduct from "./NewProduct";
import ClipLoader from "react-spinners/ClipLoader";

// Notice that we're exporting the AllProducts component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    if (this.props.products.length) {
      return (
        <div>
          {this.props.isAdmin ? <NewProduct /> : null}
          <div id="product-list">
            {this.props.products.map((product) => (
              <div id="card" key={product.id}>
                <img id="product-image-card" src={product.imageUrl} />
                <Link
                  className="product-title-card"
                  to={`/products/${product.id}`}
                >
                  {product.name} <br />{" "}
                </Link>
                <div className="product-content-card">
                  {product.description}
                </div>
                <div className="product-price-card">
                  Price: ${product.price}
                </div>
                {this.props.isAdmin ? (
                  <span onClick={() => this.props.deleteProduct(product.id)}>
                    x
                  </span>
                ) : null}
              </div>
            ))}
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
    products: state.products,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
