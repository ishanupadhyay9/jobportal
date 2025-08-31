import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // Retrieve token directly as a string (avoid JSON.parse error)
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  userData: {},
  userId: "",
  isRegistered: false,
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    printAuth:(state)=>{
console.log(state);
    },

    setToken: (state, action) => {
      state.token = action.payload;
      // Optional: store token in localStorage for persistence
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = {};
      state.userId = "";
      state.isRegistered = false;
      state.role = "";
      localStorage.removeItem("token");
    },
  },
});

export const {
  setLoading,
  setUserData,
  setUserId,
  setToken,
  setIsRegistered,
  setRole,
  logout,
  printAuth
} = authSlice.actions;

export default authSlice.reducer;
