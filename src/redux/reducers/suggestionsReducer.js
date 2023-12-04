import { GET_SUGGESTIONS, IS_LOADING_SUGGESTIONS, IS_ERROR_SUGGESTIONS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUGGESTIONS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_SUGGESTIONS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_SUGGESTIONS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default suggestionsReducer;
