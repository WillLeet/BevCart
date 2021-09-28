import React from "react";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/products";
import { Link } from "react-router-dom";
import NewProduct from "./NewProduct";
import ClipLoader from "react-spinners/ClipLoader";
import ProductPages from "./ProductPages";
import "bootstrap/dist/css/bootstrap.css";

// Notice that we're exporting the AllProducts component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: +this.props.location.search.slice(1).split("=")[1] || 1,
    };
  }

  async componentDidMount() {
    try {
      await this.props.fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  componentDidUpdate() {
    /* I check whether the page has changed and load the appropriate data */
    if (
      +this.props.location.search.slice(1).split("=")[1] &&
      this.state.page !== +this.props.location.search.slice(1).split("=")[1]
    ) {
      this.setState(
        { page: +this.props.location.search.slice(1).split("=")[1] },
        () => this.props.fetchProducts()
      );
      /* immediatly after updating state call callback */
    }
  }

  render() {
    if (this.props.products.length) {
      let products = this.props.products;
      const pages = [];
      for (let i = 0; i < products.length / 10; ++i) {
        pages.push(i);
      }
      products = products.slice(
        (this.state.page - 1) * 10,
        this.state.page * 10
      );
      return (
        <div>
          <div className="d-flex justify-content-center">
            <ul className="pagination pages pagination-lg">
              {pages.map((page, index) => {
                const pageItem =
                  index + 1 === this.state.page
                    ? "page-item active"
                    : "page-item";
                return (
                  <li key={page} className={pageItem}>
                    <ProductPages index={index} />
                  </li>
                );
              })}
            </ul>
          </div>
          {this.props.isAdmin ? <NewProduct /> : null}
          <div id="product-list">
            {products.map((product) => (
              <div id="card" key={product.id}>
                <img
                  id="product-image-card"
                  className="rounded img-thumbnail"
                  src={product.imageUrl}
                />
                <Link
                  className="product-title-card"
                  to={`/products/${product.id}`}
                >
                  {product.name} <br />{" "}
                </Link>
                <div className="content-wrapper">
                <div className="product-content-card">
                  {product.description}
                </div>
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
