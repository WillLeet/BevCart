import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, updateProduct } from '../store/singleProduct';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || '',
        description: this.props.product.description || '',
        price: this.props.product.price || ''
      })
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({...this.props.product, ...this.state})
    window.location.href = `/products/${this.props.product.id}`;
  }

  render() {
    const { name, description, price } = this.state;
    return (
      this.props.product ? (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input name="name" onChange={this.handleChange} value={name} />
        <input name="description" onChange={this.handleChange} value={description} />
        <input name="price" onChange={this.handleChange} value={price} />
        <button to="/products" type="submit">Update</button>
        <Link to="/products">Cancel</Link>
      </form>
      </div>) : (<h1>LOADING</h1>)
    );
  }
}

const mapStateToProps = ({ product }) => ({
  product
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
