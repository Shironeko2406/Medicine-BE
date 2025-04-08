import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./ReducerAPI/UserReducer";


export const store = configureStore({
  reducer: {
    number: (state = 1) => state,
    UserReducer,

  },
});
