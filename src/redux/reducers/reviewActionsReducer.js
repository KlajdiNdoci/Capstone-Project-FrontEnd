import { ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_SUCCESS } from "../actions";

const initialState = {
  addMessage: "",
  updateMessage: "",
};

const reviewActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        addMessage: action.payload,
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        addMessage: action.payload,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        updateMessage: action.payload,
      };
    case UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        updateMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reviewActionsReducer;
