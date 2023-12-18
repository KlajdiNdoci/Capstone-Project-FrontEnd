import { GET_USER_FRIENDS, IS_LOADING_USER_FRIENDS, IS_ERROR_USER_FRIENDS } from "../actions";

const initialState = {
  content: null,
  isLoading: true,
  isError: false,
};

const userFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FRIENDS:
      return {
        ...state,
        content: action.payload,
      };
    case IS_LOADING_USER_FRIENDS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR_USER_FRIENDS:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default userFriendsReducer;
