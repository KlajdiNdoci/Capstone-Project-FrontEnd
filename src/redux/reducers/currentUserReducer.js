import { GET_MY_PROFILE, IS_LOADING_MY_PROFILE, IS_ERROR_MY_PROFILE } from "../actions";

const initialState = {
  content: null,
  isLoading: true,
  isError: false,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_MY_PROFILE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_MY_PROFILE:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
