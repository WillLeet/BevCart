import axios from "axios"

const SET_CART = "SET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const UPDATE_QUANTITY = "UPDATE_QUANTITY"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"

const setCart = (cart) => {
    return ({
      type: SET_CART,
      cart
    })
  };
  
  const addedItem = (item) => {
    return {
      type: ADD_TO_CART,
      item
    };
  }
  
  const removedItem = (item) => {
    return {
      type: REMOVE_FROM_CART,
      item
    }
  }
  
  const updatedQuantity = (item) => {
    return {
      type: UPDATE_QUANTITY,
      item
    };
  };
  
  export const fetchCart = (userId) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/cart/${userId}`)
        dispatch(setCart(data))
      } catch (err) {
        console.error(err)
      }
    }
  };
  
  export const addItemToCart = (item) => {
    return async (dispatch) => {
      const { data: added} = await axios.post(`/api/cart/${item.userId}/${item.productId}`, item);
      dispatch(addedItem(added));
    };
  };
  
  export const removeItemFromCart = (userId,productId) => {
    return async (dispatch) => {
      const {data: removed} = await axios.delete(`/api/cart/${userId}/${productId}`)
      dispatch(removedItem(removed))
    }
  }
  
  export const updateQuantity = (item) => {
    return async (dispatch) => {
        const { data: updated} = await axios.put(`/api/cart/${item.userId}/${item.productId}`, item);
        dispatch(updatedQuantity(updated));
    }
  }

export default function cartReducer(cart = [], action) {
    switch (action.type) {
      case SET_CART:
        return action.cart
      case ADD_TO_CART:
        //Using a for loop instead of a map here so that I can return updated quantity match, and return updated array on no match
        for(let i = 0; i < cart.length; i++){
            if(cart[i].id === action.item.id){
                cart[i] = action.item;
                return cart;
            }
        }
        return [...cart, action.item];
      case UPDATE_QUANTITY:
        return cart.map(item => (item.id === action.item.id ? action.item : item))
      case REMOVE_FROM_CART:
        return cart.filter(item => item.id !== action.item.id)
      default:
        return cart;
    }
  }