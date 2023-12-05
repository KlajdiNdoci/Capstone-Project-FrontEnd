import { GET_SEARCHED_GAMES, IS_LOADING_SEARCHED_GAMES, IS_ERROR_SEARCHED_GAMES } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const searchedGamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCHED_GAMES:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_SEARCHED_GAMES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_SEARCHED_GAMES:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default searchedGamesReducer;
