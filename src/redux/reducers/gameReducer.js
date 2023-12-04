import { GET_GAME, IS_LOADING_GAME, IS_ERROR_GAME } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_GAME:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_GAME:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
