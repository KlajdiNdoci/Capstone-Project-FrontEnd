import { GET_USER_SAVED_GAMES, IS_LOADING_USER_SAVED_GAMES, IS_ERROR_USER_SAVED_GAMES } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const userSavedGamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SAVED_GAMES:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_USER_SAVED_GAMES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_USER_SAVED_GAMES:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default userSavedGamesReducer;
