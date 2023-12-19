import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
} from "../actions";

const initialState = {
  addMessage: "",
  updateMessage: "",
  deleteMessage: "",
};

const commentActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addMessage: action.payload,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addMessage: action.payload,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        updateMessage: action.payload,
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        updateMessage: action.payload,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    default:
      return state;
  }
};

export default commentActionsReducer;
