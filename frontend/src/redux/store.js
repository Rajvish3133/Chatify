import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';


  const customStorage = {
    getItem: (key) => {
      return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, value) => {
      return Promise.resolve(localStorage.setItem(key, value));
    },
    removeItem: (key) => {
      return Promise.resolve(localStorage.removeItem(key));
    },
  };

  const persistConfig = {
    key: 'root',
    version: 1,
    storage: customStorage,
    whitelist: ['user'],
  }

  const rootReducer = combineReducers({
    user:userReducer,
    message:messageReducer,
    socket:socketReducer
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;