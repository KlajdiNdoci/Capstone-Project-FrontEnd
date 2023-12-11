import { GET_GAME_REVIEWS, IS_LOADING_GAME_REVIEWS, IS_ERROR_GAME_REVIEWS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const gameReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_REVIEWS:
      return {
        ...state,
        content: {
          ...state.content,
          content: state.content.content.map(review => (review.id === action.payload.id ? action.payload : review)),
        },
      };
    case IS_LOADING_GAME_REVIEWS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_GAME_REVIEWS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default gameReviewsReducer;
