import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    userData:null,
    userId:null,
    isRegistered:false,
    role:"user"

};
export const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers:{
       setLoading : (state,value) =>{
        state.loading = value.payload
       },
        setToken : (state,value) =>{
        state.loading = value.payload
       },
        setUserId : (state,value) =>{
        state.loading = value.payload
       },
        setUserData : (state,value) =>{
        state.loading = value.payload
       },

       setIsRegistered :(state, value) =>{
        state.isRegistered = value.payload
       },

       setRole :(state , value)=>{
state.role = value.payload
       }

    }
});

export const {setLoading,setUserData,setUserId,setToken,setIsRegistered,setRole} =authSlice.actions;
export default authSlice.reducer;