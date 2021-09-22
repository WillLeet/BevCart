import axios from "axios";

/*
  EXPORTS:
    fetchProduct
    updateProduct
*/

/**
 * ACTION TYPES
 */

const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const SET_PRODUCT = "SET_PRODUCT";

/**
 * ACTION CREATORS
 */

const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

const editProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return dispatch(setProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      return dispatch(editProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function productReducer(product = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return product;
  }
}
