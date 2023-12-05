import { GET_NEWS, IS_LOADING_NEWS, IS_ERROR_NEWS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_NEWS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_NEWS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
