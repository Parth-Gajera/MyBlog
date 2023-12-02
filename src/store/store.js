import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"

const store=configureStore({
    reducer:{
        auth:authSlice
        //ToDo more slice related to Post
    }
});

export  default store