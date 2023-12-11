import { GET_REVIEW_LIKES, IS_LOADING_REVIEW_LIKES, IS_ERROR_REVIEW_LIKES } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const reviewLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_LIKES:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_REVIEW_LIKES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_REVIEW_LIKES:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default reviewLikesReducer;
