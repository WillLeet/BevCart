import axios from "axios";

/*
  EXPORTS:
    fetchUser
    fetchUserByName
    updateUser
*/

/**
 * ACTION TYPES
 */

const UPDATE_USER = "UPDATE_USER";
const SET_USER = "SET_USER";

/**
 * ACTION CREATORS
 */

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const editUser = (user) => ({
  type: UPDATE_USER,
  user,
});

/**
 * THUNK CREATORS
 */

export const fetchUserByName = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/?username=${username}`);
      return dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUserByToken = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/?token=${token}`);
      return dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: {
          auth: token,
        },
      });
      return dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dipatch) => {
    try {
      const token = window.localStorage.token;
      const { data } = await axios.put(
        `/api/users/${user.id}`,
        {
          headers: {
            auth: token,
          },
        },
        user
      );
      return dispatch(editUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function userReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return user;
  }
}
