import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from "../actions";

const initialState = {
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
