import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './User'
// import { UsersSlice } from "./UserSlice";

const store = configureStore({
    reducer:{
      // users:UsersSlice.reducer,
      users:usersReducer
    }
})

export default store;