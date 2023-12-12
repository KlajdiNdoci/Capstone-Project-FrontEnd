import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "../actions";

const initialState = {
  successMessage: "",
  failureMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        failureMessage: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
