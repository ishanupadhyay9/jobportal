// authApi.js
import { apiConnector } from "../apiConnnector";
import { authendpoins, profileEndpoints } from "../apis";
import { setLoading, setToken, setUserData, setUserId, setIsRegistered, setRole } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

const {
  USER_REGISTER_API,
  EMPLOYER_REGISTER_API
} = authendpoins;

const {
  GET_USER_DETAILS_API,
  GET_EMP_DETAILS_API
} = profileEndpoints;

export async function signup(dispatch, navigate, email, user, password, confirmpassword) {

  if (!email || !password || !user || !confirmpassword) {
    toast.error("All fields are required");
    return;
  }

  if (password !== confirmpassword) {
    toast.error("Password and confirm password should match");
    return;
  }

  dispatch(setLoading(true));

  const API_URL = user === "user" ? USER_REGISTER_API : EMPLOYER_REGISTER_API;
  const DETAILS_URL = user === "user" ? GET_USER_DETAILS_API : GET_EMP_DETAILS_API;

  try {
    const response = await apiConnector("POST", API_URL, { email, password, user });
    const token = response.data.token;

    const decoded = jwtDecode(token);
    dispatch(setUserId(decoded.id));
    dispatch(setToken(token));
    localStorage.setItem("token", JSON.stringify(token));

    try {
      const registered = await apiConnector("GET", DETAILS_URL, { Authorization: `Bearer ${token}` });
      dispatch(setIsRegistered(true));
      if (!registered) {
        navigate(user === "user" ? "/user-personal-tab" : "/employer-personal-tab");
      } else {
        navigate("/");
      }
    } catch {
      navigate(user === "user" ? "/user-personal-tab" : "/employer-personal-tab");
    }

  } catch (error) {
    toast.error("Error in signup");
    console.error(error);
  }

  dispatch(setLoading(false));
}
