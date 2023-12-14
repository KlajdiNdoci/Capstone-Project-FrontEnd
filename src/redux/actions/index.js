// PROFILE
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const IS_LOADING_MY_PROFILE = "IS_LOADING_MY_PROFILE";
export const IS_ERROR_MY_PROFILE = "IS_ERROR_MY_PROFILE";

// SUGGESTIONS
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const IS_LOADING_SUGGESTIONS = "IS_LOADING_SUGGESTIONS";
export const IS_ERROR_SUGGESTIONS = "IS_ERROR_SUGGESTIONS";

//SINGLE GAME
export const GET_SINGLE_GAME = "GET_SINGLE_GAME";
export const IS_LOADING_SINGLE_GAME = "IS_LOADING_SINGLE_GAME";
export const IS_ERROR_SINGLE_GAME = "IS_ERROR_SINGLE_GAME";

//GAMES
export const GET_GAMES = "GET_GAMES";
export const IS_LOADING_GAMES = "IS_LOADING_GAMES";
export const IS_ERROR_GAMES = "IS_ERROR_GAMES";

//NEWS
export const GET_NEWS = "GET_NEWS";
export const IS_LOADING_NEWS = "IS_LOADING_NEWS";
export const IS_ERROR_NEWS = "IS_ERROR_NEWS";

//GAME REVIEWS
export const GET_GAME_REVIEWS = "GET_GAME_REVIEWS";
export const IS_LOADING_GAME_REVIEWS = "IS_LOADING_GAME_REVIEWS";
export const IS_ERROR_GAME_REVIEWS = "IS_ERROR_GAME_REVIEWS";
export const LIKE_REVIEW = "LIKE_REVIEW";
export const GET_RECENT_REVIEWS = "GET_RECENT_REVIEWS";
export const IS_LOADING_RECENT_REVIEWS = "IS_LOADING_RECENT_REVIEWS";
export const IS_ERROR_RECENT_REVIEWS = "IS_ERROR_RECENT_REVIEWS";

//AUTH
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const getCurrentUserAction = token => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/me";
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      dispatch({ type: IS_LOADING_MY_PROFILE, payload: true });
      dispatch({ type: IS_ERROR_MY_PROFILE, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const currentUser = await resp.json();
        dispatch({ type: GET_MY_PROFILE, payload: currentUser });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_MY_PROFILE, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_MY_PROFILE, payload: false });
    }
  };
};

export const getSuggestions = (query, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/games/search?q=" + query + "&size=3";
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_SUGGESTIONS, payload: true });
      dispatch({ type: IS_ERROR_SUGGESTIONS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const suggestions = await resp.json();
        dispatch({ type: GET_SUGGESTIONS, payload: suggestions });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_SUGGESTIONS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_SUGGESTIONS, payload: false });
    }
  };
};

export const getSingleGame = (gameId, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/games/" + gameId;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      dispatch({ type: IS_LOADING_SINGLE_GAME, payload: true });
      dispatch({ type: IS_ERROR_SINGLE_GAME, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const game = await resp.json();
        dispatch({ type: GET_SINGLE_GAME, payload: game });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_SINGLE_GAME, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_SINGLE_GAME, payload: false });
    }
  };
};

export const getGames = (size = 5, token, page = 0) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/games?size=" + size + "&page=" + page;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: IS_LOADING_GAMES, payload: true });
        dispatch({ type: IS_ERROR_GAMES, payload: false });
        const games = await resp.json();
        dispatch({ type: GET_GAMES, payload: games });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_GAMES, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_GAMES, payload: false });
    }
  };
};

export const getNews = (size = 5, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news?size=" + size;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: IS_LOADING_NEWS, payload: true });
        dispatch({ type: IS_ERROR_NEWS, payload: false });
        const news = await resp.json();
        dispatch({ type: GET_NEWS, payload: news });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_NEWS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_NEWS, payload: false });
    }
  };
};

export const getGameReviewsMinusDays = (gameId, days, size = 5, order, direction, token) => {
  return async dispatch => {
    const URL =
      process.env.REACT_APP_SERVER_URL +
      "/reviews/game/" +
      gameId +
      "/" +
      days +
      "?size=" +
      size +
      "&orderBy=" +
      order +
      "&direction=" +
      direction;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: IS_LOADING_GAME_REVIEWS, payload: true });
        dispatch({ type: IS_ERROR_GAME_REVIEWS, payload: false });
        const gameReviews = await resp.json();
        dispatch({ type: GET_GAME_REVIEWS, payload: gameReviews });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_GAME_REVIEWS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_GAME_REVIEWS, payload: false });
    }
  };
};

export const likeReview = (reviewId, token) => {
  return async () => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/" + reviewId + "/likes";
    const method = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRecentReviews = (gameId, size = 5, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/game/" + gameId + "?size=" + size;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      dispatch({ type: IS_LOADING_RECENT_REVIEWS, payload: true });
      dispatch({ type: IS_ERROR_RECENT_REVIEWS, payload: false });
      if (resp.ok) {
        const recentReviews = await resp.json();
        dispatch({ type: GET_RECENT_REVIEWS, payload: recentReviews });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_RECENT_REVIEWS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_RECENT_REVIEWS, payload: false });
    }
  };
};

export const register = (name, surname, email, password, username, navigate) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/auth/register";
    const method = {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        password,
        email,
        username,
      }),
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      console.log(resp);
      if (resp.ok) {
        dispatch({ type: REGISTRATION_SUCCESS, payload: "Registration successful!" });
        setTimeout(() => {
          dispatch({ type: REGISTRATION_SUCCESS, payload: "" });
          navigate("/login");
        }, 3000);
      } else {
        const data = await resp.json();
        console.log(data);
        dispatch({
          type: REGISTRATION_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        setTimeout(() => {
          dispatch({ type: REGISTRATION_FAILURE, payload: "" });
        }, 3000);
      }
    } catch (error) {
      dispatch({ type: REGISTRATION_FAILURE, payload: "Generic error:", error });
      setTimeout(() => {
        dispatch({ type: REGISTRATION_FAILURE, payload: "" });
      }, 3000);
    }
  };
};

export const login = (email, password, navigate) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/auth/login";
    const method = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SAVE_TOKEN, payload: data.accessToken });
        navigate("/");
      } else {
        const data = await resp.json();
        dispatch({
          type: LOGIN_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        setTimeout(() => {
          dispatch({ type: LOGIN_FAILURE, payload: "" });
        }, 3000);
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: "Generic error:", error });
      setTimeout(() => {
        dispatch({ type: LOGIN_FAILURE, payload: "" });
      }, 3000);
    }
  };
};

export const filterByGenre = (size = 5, token, genre, order, direction, page = 0) => {
  return async dispatch => {
    const URL =
      process.env.REACT_APP_SERVER_URL +
      "/games/genres?size=" +
      size +
      "&orderBy=" +
      order +
      "&direction=" +
      direction +
      "&genre=" +
      genre +
      "&page=" +
      page;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: GET_GAMES, payload: [] });
        dispatch({ type: IS_LOADING_GAMES, payload: true });
        dispatch({ type: IS_ERROR_GAMES, payload: false });
        const games = await resp.json();
        dispatch({ type: GET_GAMES, payload: games });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_GAMES, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_GAMES, payload: false });
    }
  };
};

export const filterByPlatform = (size = 5, token, platform, order, direction, page = 0) => {
  return async dispatch => {
    const URL =
      process.env.REACT_APP_SERVER_URL +
      "/games/platforms?size=" +
      size +
      "&orderBy=" +
      order +
      "&direction=" +
      direction +
      "&platform=" +
      platform +
      "&page=" +
      page;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: GET_GAMES, payload: [] });
        dispatch({ type: IS_LOADING_GAMES, payload: true });
        dispatch({ type: IS_ERROR_GAMES, payload: false });
        const games = await resp.json();
        dispatch({ type: GET_GAMES, payload: games });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_GAMES, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_GAMES, payload: false });
    }
  };
};
