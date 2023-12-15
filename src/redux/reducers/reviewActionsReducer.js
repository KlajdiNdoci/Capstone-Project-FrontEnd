import {
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_SUCCESS,
} from "../actions";

const initialState = {
  addMessage: "",
  updateMessage: "",
  deleteMessage: "",
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
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reviewActionsReducer;
