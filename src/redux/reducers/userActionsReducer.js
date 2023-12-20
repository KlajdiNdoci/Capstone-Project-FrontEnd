import {
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_AVATAR_FAILURE,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  DELETE_PROFILE_FAILURE,
  DELETE_PROFILE_SUCCESS,
} from "../actions";

const initialState = {
  addMessage: "",
  updateInfoMessage: "",
  updateAvatarMessage: "",
  deleteMessage: "",
};

const userActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateInfoMessage: action.payload,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updateInfoMessage: action.payload,
      };
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        updateInfoMessage: action.payload,
      };
    case UPDATE_PROFILE_AVATAR_FAILURE:
      return {
        ...state,
        updateInfoMessage: action.payload,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    case DELETE_PROFILE_FAILURE:
      return {
        ...state,
        deleteMessage: action.payload,
      };
    default:
      return state;
  }
};

export default userActionsReducer;
