import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/products";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state});
  }

  render() {
    const {name, description, price} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div id="new-product">
          <input
            type="text"
            name="name"
            placeholder="name..."
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description..."
            value={description}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price..."
            value={price}
            onChange={this.handleChange}
          />
          <span>
            <button type="submit">
              Submit
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(createProduct(product))
  };
};

export default connect(null, mapDispatchToProps)(NewProduct);
