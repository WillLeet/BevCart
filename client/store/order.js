import axios from "axios";

const SET_ORDER = "SET_ORDER";
const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
const SET_ORDER_HISTORY = "SET_ORDER_HISTORY";
const SEND_ORDER = "SEND_ORDER";
const INITIALIZE_ORDER = "INITIALIZE_ORDER";

const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

const setCurrentOrder = (order) => {
    return {
      type: SET_CURRENT_ORDER,
      order,
    };
  };

  const setOrderHistory = (orders) => {
    return {
      type: SET_ORDER_HISTORY,
      orders,
    };
  };

const sentOrder = (orders) => {
    return {
        type: SEND_ORDER,
        orders
    }
}

const initializedOrder = (order) => {
    return {
        type: INITIALIZE_ORDER,
        order
    }
}

export const fetchOrder = (userId,orderId) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/order/${userId}/${orderId}`);
        dispatch(setOrder(data));
      } catch (err) {
        console.error(err);
      }
    };
  };

export const fetchCurrentOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/order/${userId}`);
      console.log("In the thunk, data is",data);
      dispatch(setCurrentOrder(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchOrderHistory = (userId) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/order/${userId}/history`);
        dispatch(setOrderHistory(data));
      } catch (err) {
        console.error(err);
      }
    };
  };

export const sendOrder = (userId) => {
  return async (dispatch) => {
    const { data: oldCurrent } = await axios.post(`/api/order/${userId}`);
    const {data: newCurrent } = await axios.get(`/api/order/${userId}`);
    console.log("oldCurrent is ",oldCurrent);
    console.log("newCurrent is ",newCurrent);
    dispatch(sentOrder({oldCurrent, newCurrent}))
  };
};

export const initializeOrder = (userId) => {
    return async (dispatch) => {
      const { data: newOrder } = await axios.post(`/api/order/${userId}/new`);
      dispatch(initializedOrder(newOrder));
    };
  };

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDER:
        return [action.order];
    case SET_ORDER_HISTORY:
        return action.orders;
    case SET_CURRENT_ORDER:
        return [action.order];
    case SEND_ORDER:
        console.log("State is ",state);
        const tomap = [...state, action.orders.newCurrent]
        console.log("Tomap is ",tomap);
        return tomap.map(order => (order.id === action.orders.oldCurrent.id ? action.orders.oldCurrent : order))
    default:
      return state;
  }
}

