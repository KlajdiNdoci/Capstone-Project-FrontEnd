import { GET_GAMES, IS_LOADING_GAMES, IS_ERROR_GAMES } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const searchedGamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_GAMES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_GAMES:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default searchedGamesReducer;
