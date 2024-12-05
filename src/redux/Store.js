import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cardReducer from "./features/cards/CardsSlice";
import themeReducer from "./features/theme/themeSlice";

const configuration = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ card: cardReducer, theme: themeReducer });

const persistedReducer = persistReducer(configuration, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
