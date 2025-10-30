"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    token:null,
    user:null
    
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.token=action.payload.token;
            state.user=action.payload.user;
            console.log(action.payload);
            
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("userID",action.payload.user);
        },
        Logout:(state)=>{
            state.token=null;
            state.user=null;
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
        }
    }
});

export const {setCredentials,Logout}=authSlice.actions;
export default authSlice.reducer;