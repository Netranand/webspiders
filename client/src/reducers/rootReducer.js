import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import newUserReducer from './newUserReducer';

export default combineReducers({
  authReducer,
  errorReducer,
  userReducer,
  newUserReducer
 });
