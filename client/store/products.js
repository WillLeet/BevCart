import axios from "axios";

/*
  EXPORTS:
    fetchProducts
    deleteProduct
    addProduct
*/

/**
 * ACTION TYPES
 */

const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

/**
 * ACTION CREATORS
 */

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const removeProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      return dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      return dispatch(removeProduct(data.id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      return dispatch(addProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function productsReducer(products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return products.filter((product) => product.id !== action.productId);
    case ADD_PRODUCT:
      return [...products, action.product];
    default:
      return products;
  }
}
