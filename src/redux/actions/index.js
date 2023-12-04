// PROFILE
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const IS_LOADING_MY_PROFILE = "IS_LOADING_MY_PROFILE";
export const IS_ERROR_MY_PROFILE = "IS_ERROR_MY_PROFILE";

// GAMES
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const IS_LOADING_SUGGESTIONS = "IS_LOADING_SUGGESTIONS";
export const IS_ERROR_SUGGESTIONS = "IS_ERROR_SUGGESTIONS";

export const getCurrentUserAction = () => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/me";
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_BEARER_TOKEN,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const currentUser = await resp.json();
        dispatch({ type: GET_MY_PROFILE, payload: currentUser });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_MY_PROFILE });
    } finally {
      dispatch({ type: IS_LOADING_MY_PROFILE });
    }
  };
};

export const getSuggestions = query => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/games/search?q=" + query + "&size=3";
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_BEARER_TOKEN,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const suggestions = await resp.json();
        dispatch({ type: GET_SUGGESTIONS, payload: suggestions });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_SUGGESTIONS });
    } finally {
      dispatch({ type: IS_LOADING_SUGGESTIONS });
    }
  };
};
