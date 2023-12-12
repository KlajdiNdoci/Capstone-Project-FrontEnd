import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "../actions";

const initialState = {
  message: "",
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

    default:
      return state;
  }
};

export default authReducer;
