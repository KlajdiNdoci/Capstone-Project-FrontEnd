import { GET_USER_COMMENTS, IS_LOADING_USER_COMMENTS, IS_ERROR_USER_COMMENTS } from "../actions";

const initialState = {
  content: [],
  isLoading: true,
  isError: false,
};

const userCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COMMENTS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_USER_COMMENTS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_USER_COMMENTS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default userCommentsReducer;
