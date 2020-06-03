import {
 
  GET_USER,
  GET_ALL_USERS,
 
} from '../actions/actionTypes';

const initialState = {
  allUsers: [],
  
  currUser: {},
  
};

export default function (state = initialState, action) {
  switch (action.type) {
   
    case GET_USER:
      return {
        ...state,
        currUser: action.payload,
        
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
   
    default:
      return state;
  }
}
