import { GET_USER_SUCCESS, GET_USER_ERROR, ADD_USER_SUCCESS, ADD_USER_ERROR, EDIT_USER_SUCCESS, EDIT_USER_ERROR, DELETE_USER_SUCCESS, DELETE_USER_ERROR } from '../actions/actionTypes';


const initialState = {}

const userReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return action.materials;


        case ADD_USER_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }

        case ADD_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            }

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }
        case EDIT_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }

           
        case DELETE_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state;


    }
}

export default userReducer;
