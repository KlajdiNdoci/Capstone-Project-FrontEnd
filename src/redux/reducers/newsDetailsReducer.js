import { GET_NEWS_DETAILS, IS_LOADING_NEWS_DETAILS, IS_ERROR_NEWS_DETAILS } from "../actions";

const initialState = {
  content: null,
  isLoading: true,
  isError: false,
};

const newsDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_DETAILS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_NEWS_DETAILS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_NEWS_DETAILS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default newsDetailsReducer;
