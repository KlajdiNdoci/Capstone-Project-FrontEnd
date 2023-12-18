import { GET_USER, IS_LOADING_USER, IS_ERROR_USER } from "../actions";

const initialState = {
  content: null,
  isLoading: true,
  isError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_USER:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
