import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import currentUserReducer from "../reducers/currentUserReducer";
import suggestionsReducer from "../reducers/suggestionsReducer";
import gamesReducer from "../reducers/gamesReducer";
import singleGameReducer from "../reducers/singleGameReducer";
import newsReducer from "../reducers/newsReducer";
import gameReviewsReducer from "../reducers/gameReviewsReducer";
import recentReviewsReducer from "../reducers/recentReviewsReducer";
import authReducer from "../reducers/authReducer";
import userSavedGamesReducer from "../reducers/userSavedGamesReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
};

const totalReducer = combineReducers({
  currentUser: currentUserReducer,
  suggestions: suggestionsReducer,
  games: gamesReducer,
  singleGame: singleGameReducer,
  news: newsReducer,
  gameReviews: gameReviewsReducer,
  recentReviews: recentReviewsReducer,
  auth: authReducer,
  userSavedGames: userSavedGamesReducer,
});

const persistedReducer = persistReducer(persistConfig, totalReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
