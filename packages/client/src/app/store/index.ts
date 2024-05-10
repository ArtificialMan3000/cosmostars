import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import {
  notificationMiddleware,
  notificationReducer,
} from "@/entities/notification";
import { authReducer } from "@/entities/user/model/user";
import { internalApi } from "@/shared/api/internalApi";
import { yandexApi } from "@/shared/api/yandexApi";

const config = {
  key: "root",
  storage,
};

const persistGameReducer = persistReducer(config, gameReducer);

export const reducer = combineReducers({
  [yandexApi.reducerPath]: yandexApi.reducer,
  [internalApi.reducerPath]: internalApi.reducer,
  auth: authReducer,
  game: persistGameReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  preloadedState:
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat([
      yandexApi.middleware,
      internalApi.middleware,
      notificationMiddleware,
    ]),
  // todo: вынести в конфиг .env
  devTools: true,
});

export const persistor = persistStore(store);
