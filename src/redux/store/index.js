import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
};

const totalReducer = combineReducers({});

const persistedReducer = persistReducer(persistConfig, totalReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
