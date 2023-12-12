import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE, SAVE_TOKEN, LOGIN_FAILURE } from "../actions";

const initialState = {
  message: "",
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
