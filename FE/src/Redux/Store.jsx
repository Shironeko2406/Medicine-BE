import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./ReducerAPI/UserReducer";
import MedicineReducer from "./ReducerAPI/MedicineReducer";
import AuthenticationReducer from "./ReducerAPI/AuthenticationReducer";


export const store = configureStore({
  reducer: {
    number: (state = 1) => state,
    UserReducer,
    MedicineReducer,
    AuthenticationReducer

  },
});
