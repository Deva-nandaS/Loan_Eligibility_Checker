import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import loanReducer from '../slices/loanSlice'
import sidebarReducer from "../slices/sidebarSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        loan:loanReducer,
        sidebar:sidebarReducer
    }
})