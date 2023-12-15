import { GET_USER_REVIEWS, IS_LOADING_USER_REVIEWS, IS_ERROR_USER_REVIEWS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const userReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_USER_REVIEWS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_USER_REVIEWS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default userReviewsReducer;
