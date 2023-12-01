export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const IS_LOADING_MY_PROFILE = "IS_LOADING_MY_PROFILE";
export const IS_ERROR_MY_PROFILE = "IS_ERROR_MY_PROFILE";

export const getCurrentUserAction = () => {
  return async dispatch => {
    const URL = process.env.SERVER_URL;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.BEARER_TOKEN,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const myProfile = await resp.json();
        dispatch({ type: GET_MY_PROFILE, payload: myProfile });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_MY_PROFILE });
    } finally {
      dispatch({ type: IS_LOADING_MY_PROFILE });
    }
  };
};