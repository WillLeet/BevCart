import axios from "axios";

/*
  EXPORTS:
    fetchUsers
    deleteUser
    createUser
*/

/**
 * ACTION TYPES
 */

const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";
const ADD_USER = "ADD_USER";

/**
 * ACTION CREATORS
 */

const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

const removeUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

/**
 * THUNK CREATORS
 */

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      return dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}`);
      return dispatch(removeUser(data.id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users", user);
      return dispatch(addUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function usersReducer(users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case DELETE_USER:
      return users.filter((user) => user.id !== action.userId);
    case ADD_USER:
      return [...users, action.user];
    default:
      return users;
  }
}
