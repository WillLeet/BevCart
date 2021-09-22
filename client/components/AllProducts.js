import React from "react";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/products";
import { Link } from "react-router-dom";
import NewProduct from "./NewProduct";
import ProductCard from "./ProductCard"

// Notice that we're exporting the AllProducts component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    try {
      await this.props.fetchProducts();
    }
    catch (err){
      console.error(err)
    }
  }
  render() {
    return (
      <div>
        {
        this.props.products.map(product=> (
        <div key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name} {product.description} {product.price} <br /> </Link>
          <span
          onClick={() => this.props.deleteProduct(product.id)}
        >
          x
          </span>
        </div>))
        }
     <NewProduct />
      <div id="product-list">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      </div>);
  }
}

const mapState = (state) => {
  return {
    products: state.products
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
