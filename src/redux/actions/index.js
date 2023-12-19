// PROFILE
export const GET_MY_PROFILE = "GET_MY_PROFILE";
export const IS_LOADING_MY_PROFILE = "IS_LOADING_MY_PROFILE";
export const IS_ERROR_MY_PROFILE = "IS_ERROR_MY_PROFILE";
export const GET_USER = "GET_USER";
export const IS_LOADING_USER = "IS_LOADING_USER";
export const IS_ERROR_USER = "IS_ERROR_USER";
export const GET_USER_FRIENDS = "GET_USER_FRIENDS";
export const IS_LOADING_USER_FRIENDS = "IS_LOADING_USER_FRIENDS";
export const IS_ERROR_USER_FRIENDS = "IS_ERROR_USER_FRIENDS";

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
export const GET_USER_SAVED_GAMES = "GET_USER_SAVED_GAMES";
export const IS_LOADING_USER_SAVED_GAMES = "IS_LOADING_USER_SAVED_GAMES";
export const IS_ERROR_USER_SAVED_GAMES = "IS_ERROR_USER_SAVED_GAMES";

//NEWS
export const GET_NEWS = "GET_NEWS";
export const IS_LOADING_NEWS = "IS_LOADING_NEWS";
export const IS_ERROR_NEWS = "IS_ERROR_NEWS";
export const GET_NEWS_DETAILS = "GET_NEWS_DETAILS";
export const IS_LOADING_NEWS_DETAILS = "IS_LOADING_NEWS_DETAILS";
export const IS_ERROR_NEWS_DETAILS = "IS_ERROR_NEWS_DETAILS";

//GAME REVIEWS
export const GET_GAME_REVIEWS = "GET_GAME_REVIEWS";
export const IS_LOADING_GAME_REVIEWS = "IS_LOADING_GAME_REVIEWS";
export const IS_ERROR_GAME_REVIEWS = "IS_ERROR_GAME_REVIEWS";
export const LIKE_REVIEW = "LIKE_REVIEW";
export const GET_RECENT_REVIEWS = "GET_RECENT_REVIEWS";
export const IS_LOADING_RECENT_REVIEWS = "IS_LOADING_RECENT_REVIEWS";
export const IS_ERROR_RECENT_REVIEWS = "IS_ERROR_RECENT_REVIEWS";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "UPDATE_REVIEW_FAILURE";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";
export const GET_USER_REVIEWS = "GET_USER_REVIEWS";
export const IS_LOADING_USER_REVIEWS = "IS_LOADING_USER_REVIEWS";
export const IS_ERROR_USER_REVIEWS = "IS_ERROR_USER_REVIEWS";

//AUTH
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//COMMENTS
export const GET_USER_COMMENTS = "GET_USER_COMMENTS";
export const IS_LOADING_USER_COMMENTS = "IS_LOADING_USER_COMMENTS";
export const IS_ERROR_USER_COMMENTS = "IS_ERROR_USER_COMMENTS";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

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
      dispatch({ type: IS_LOADING_GAMES, payload: true });
      dispatch({ type: IS_ERROR_GAMES, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
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

export const getNews = (size = 5, token, page = 0) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news?size=" + size + "&page=" + page;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_NEWS, payload: true });
      dispatch({ type: IS_ERROR_NEWS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
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

export const getNewsDetails = (token, newsId) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news/" + newsId;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_NEWS_DETAILS, payload: true });
      dispatch({ type: IS_ERROR_NEWS_DETAILS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const news = await resp.json();
        dispatch({ type: GET_NEWS_DETAILS, payload: news });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_NEWS_DETAILS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_NEWS_DETAILS, payload: false });
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
      dispatch({ type: IS_LOADING_GAME_REVIEWS, payload: true });
      dispatch({ type: IS_ERROR_GAME_REVIEWS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
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
      dispatch({ type: IS_LOADING_RECENT_REVIEWS, payload: true });
      dispatch({ type: IS_ERROR_RECENT_REVIEWS, payload: false });
      const resp = await fetch(URL, method);
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
      if (resp.ok) {
        dispatch({ type: REGISTRATION_SUCCESS, payload: "Registration successful!" });
        setTimeout(() => {
          dispatch({ type: REGISTRATION_SUCCESS, payload: "" });
          navigate("/login");
        }, 3000);
      } else {
        const data = await resp.json();
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
      dispatch({ type: IS_LOADING_GAMES, payload: true });
      dispatch({ type: IS_ERROR_GAMES, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: GET_GAMES, payload: [] });
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
      dispatch({ type: IS_LOADING_GAMES, payload: true });
      dispatch({ type: IS_ERROR_GAMES, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: GET_GAMES, payload: [] });
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

export const addRemoveFromLibrary = (gameId, token) => {
  return async () => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/" + gameId + "/games";
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

export const getUserSavedGames = (size = 5, token, page = 0, userId) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/games/users/" + userId + "?size=" + size + "&page=" + page;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_USER_SAVED_GAMES, payload: true });
      dispatch({ type: IS_ERROR_USER_SAVED_GAMES, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const games = await resp.json();
        dispatch({ type: GET_USER_SAVED_GAMES, payload: games });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_USER_SAVED_GAMES, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_USER_SAVED_GAMES, payload: false });
    }
  };
};

export const addReview = (token, gameId, title, content, rating) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/game/" + gameId;
    const method = {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        rating,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: ADD_REVIEW_SUCCESS, payload: "Review added successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: ADD_REVIEW_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: ADD_REVIEW_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: ADD_REVIEW_FAILURE, payload: "Generic error:", error });
      dispatch({ type: ADD_REVIEW_FAILURE, payload: "" });
    }
  };
};

export const getUserReviews = (userId, size = 5, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/user/" + userId + "?size=" + size;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_USER_REVIEWS, payload: true });
      dispatch({ type: IS_ERROR_USER_REVIEWS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const recentReviews = await resp.json();
        dispatch({ type: GET_USER_REVIEWS, payload: recentReviews });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_USER_REVIEWS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_USER_REVIEWS, payload: false });
    }
  };
};

export const updateReview = (token, reviewId, title, content, rating) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/" + reviewId;
    const method = {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
        rating,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: "Review updated successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: UPDATE_REVIEW_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: UPDATE_REVIEW_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: UPDATE_REVIEW_FAILURE, payload: "Generic error:", error });
    }
  };
};

export const deleteReview = (token, reviewId) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/" + reviewId;
    const method = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: "Review deleted successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: DELETE_REVIEW_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: DELETE_REVIEW_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: "Generic error:", error });
      dispatch({ type: DELETE_REVIEW_FAILURE, payload: "" });
    }
  };
};

export const getProfile = (token, userId) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/" + userId;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      dispatch({ type: IS_LOADING_USER, payload: true });
      dispatch({ type: IS_ERROR_USER, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const user = await resp.json();
        dispatch({ type: GET_USER, payload: user });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_USER, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_USER, payload: false });
    }
  };
};

export const getUserFriends = (userId, size = 5, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/" + userId + "/friends?size=" + size;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_USER_FRIENDS, payload: true });
      dispatch({ type: IS_ERROR_USER_FRIENDS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const userFriends = await resp.json();
        dispatch({ type: GET_USER_FRIENDS, payload: userFriends });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_USER_FRIENDS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_USER_FRIENDS, payload: false });
    }
  };
};

export const addRemoveFriend = (userId, token) => {
  return async () => {
    const URL = process.env.REACT_APP_SERVER_URL + "/users/friends/" + userId;
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

export const getUserComments = (userId, size = 5, token) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/reviews/comments/" + userId + "?size=" + size;
    const method = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      dispatch({ type: IS_LOADING_USER_COMMENTS, payload: true });
      dispatch({ type: IS_ERROR_USER_COMMENTS, payload: false });
      const resp = await fetch(URL, method);
      if (resp.ok) {
        const recentReviews = await resp.json();
        dispatch({ type: GET_USER_COMMENTS, payload: recentReviews });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: IS_ERROR_USER_COMMENTS, payload: true });
    } finally {
      dispatch({ type: IS_LOADING_USER_COMMENTS, payload: false });
    }
  };
};

export const likeComment = (commentId, token) => {
  return async () => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news/comments/" + commentId + "/likes";
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

export const addComment = (token, newsId, content) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news/comments/" + newsId;
    const method = {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: "Comment added successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: ADD_COMMENT_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: ADD_COMMENT_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: ADD_COMMENT_FAILURE, payload: "Generic error:", error });
      dispatch({ type: ADD_COMMENT_FAILURE, payload: "" });
    }
  };
};

export const updateComment = (token, commentId, content) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news/comments/" + commentId;
    const method = {
      method: "PUT",
      body: JSON.stringify({
        content,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: "Comment updated successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: UPDATE_COMMENT_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: UPDATE_COMMENT_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: UPDATE_COMMENT_FAILURE, payload: "Generic error:", error });
    }
  };
};

export const deleteComment = (token, commentId) => {
  return async dispatch => {
    const URL = process.env.REACT_APP_SERVER_URL + "/news/comments/" + commentId;
    const method = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const resp = await fetch(URL, method);
      if (resp.ok) {
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: "Comment deleted successfully!" });
      } else {
        const data = await resp.json();
        dispatch({
          type: DELETE_COMMENT_FAILURE,
          payload: data.message === "No message available" ? `${data.status} ${data.error}` : data.message,
        });
        dispatch({ type: DELETE_COMMENT_FAILURE, payload: "" });
      }
    } catch (error) {
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: "Generic error:", error });
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: "" });
    }
  };
};
