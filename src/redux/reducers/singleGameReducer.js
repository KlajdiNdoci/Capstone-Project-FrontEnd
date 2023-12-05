import { GET_SINGLE_GAME, IS_LOADING_SINGLE_GAME, IS_ERROR_SINGLE_GAME } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const singleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_GAME:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_SINGLE_GAME:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_SINGLE_GAME:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default singleReducer;
