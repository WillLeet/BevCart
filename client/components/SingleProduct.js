import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { Link } from "react-router-dom"
import EditProduct from "./EditProduct"

// Notice that we're exporting the SingleProduct component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    try {
      await this.props.fetchProduct(this.props.match.params.id);
    }
    catch (err){
      console.error(err)
    }
  }
  render() {
    const product = this.props.product
    return (
      <div id="single-product">
      <div id="single-product-image">
        <img src = {product.imageUrl} />
      </div>
      <div id="single-product-details">
        <div id="single-product-title">
        Name: {product.name}
        </div>
        <div id="single-product-description">
        Description:
        {product.description}
        </div>
        <div id="single-product-price">
        Price: {product.price}
        </div>
      <button>ADD TO CART</button>
      <EditProduct />
      </div>
      </div>)
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id))
    }
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

