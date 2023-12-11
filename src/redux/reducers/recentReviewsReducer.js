import { GET_RECENT_REVIEWS, IS_LOADING_RECENT_REVIEWS, IS_ERROR_RECENT_REVIEWS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const recentReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENT_REVIEWS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_RECENT_REVIEWS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_RECENT_REVIEWS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default recentReviewsReducer;
