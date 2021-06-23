import axios from "axios";

import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../constants/userConstants";

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await axios.get("/api/users");

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const { data } = await axios.post("/api/users/create", user);

    dispatch({
      type: USER_CREATE_SUCCESS,
    });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: [...getState().userList.users, data],
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const deleteUser = (userID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/users/${userID}`);

    console.log(data);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: [
        ...getState().userList.users.filter((user) => user._id !== userID),
      ],
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.message,
    });
  }
};
