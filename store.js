import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./services/UserData.reducer";
import clientReducer from "./services/ClientData.reducer";
// import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const myStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(myStore);
