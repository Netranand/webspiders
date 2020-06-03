import axios from 'axios';
import {
  
  GET_USER,
  GET_ALL_USERS,
  
} from './actionTypes';


export const getUser = userId => async (dispatch) => {
  const result = await axios.get(`/users/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data
  });
};

export const getAllUsers = () => async (dispatch) => {
  const result = await axios.get('/users');
  return dispatch({
    type: GET_ALL_USERS,
    payload: result.data
  });
};
