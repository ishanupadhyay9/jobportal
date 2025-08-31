import { apiConnector } from "../apiConnnector.js";
import { authEndpoints, profileEndpoints } from "../apis";          // ← fixed name
import {
  setLoading,
  setToken,
  setUserData,
  setUserId,
  setIsRegistered,
  setRole,
  printAuth
} from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";                                 // ← default import

const {
  USER_REGISTER_API,
  EMPLOYER_REGISTER_API,
  USER_LOGIN_API,
  EMPLOYER_LOGIN_API
} = authEndpoints;                                                   // ← fixed name

const {
  GET_USER_DETAILS_API,
  GET_EMP_DETAILS_API,
  SET_USER_DETAILS_API,
  SET_EMP_DETAILS_API
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

  const API_URL = user === "user" ? USER_REGISTER_API : EMPLOYER_REGISTER_API;
  const role =user;
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", API_URL, { email, password, role });
    const token = response.data.token;  
    const decoded = jwtDecode(token);  
    dispatch(setUserId(decoded.id));
    console.log(decoded);
    dispatch(setToken(token));
       localStorage.setItem("token", token) ;
    console.log(decoded);                        
     dispatch(printAuth());
    // Fetch profile existence
   navigate(
        user === "user" ? "/user-personal-tab" : "/employer-personal-tab"
      );

  } catch (error) {
    toast.error("Error in signup");
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
}

export async function getEmployer(dispatch,token2)
{
try{

const token = localStorage.getItem("token") || token2 ; 
console.log(token);

const response = await apiConnector(
  "GET",
  GET_EMP_DETAILS_API,
  null,
 { Authorization: `Bearer ${token}`,}
);
dispatch(setIsRegistered(true));
return response;
}
catch(error)
{
  console.log(error);
}}

export async function login(dispatch, navigate, email ,role , password) {
  try{
   if(!email || !password){toast.error("all filds are required"); return;}
     
    const API_URL = (role==="user")?USER_LOGIN_API:EMPLOYER_LOGIN_API;
    const response = await apiConnector("POST", API_URL, { email, password, role });
    
    const token = response.data.token;  
    const decoded = jwtDecode(token); 
    console.log(decoded); 
    dispatch(setUserId(decoded.id));
    console.log(decoded);
    dispatch(setToken(token));
       localStorage.setItem("token", response.data.token) ;
    console.log(decoded);                        
     dispatch(printAuth());
    // Fetch profile existence
   navigate(
        role === "user" ? "/user-personal-tab" : "/employer-personal-tab"
      );
  }
  catch(error)
  {
    console.log(error);
  }
}

export async function setEmployerDetails(
  dispatch,
  navigate,
  firstname,
  lastname,
  male,
  org,
  city,
  state,
  country,
  logofile // File object from input
) {
  if (
    !firstname ||
    !lastname ||
    !org ||
    !city ||
    !state ||
    !country ||
    !logofile
  ) {
    toast.error("Please fill all required fields and upload avatar image.");
    return;
  }

  dispatch(setLoading(true));

  try {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    // Ensure backend receives either boolean true or string 'true'
    formData.append("male", (male === true || male === "true") ? "true" : "false");
    formData.append("org", org);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    // Use the same field name your multer.single(...) expects. Here I use 'file'
    formData.append("org_avatar", logofile);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      dispatch(setLoading(false));
      return;
    }

   const response = await apiConnector(
  "POST",
  SET_EMP_DETAILS_API,
  formData,
  {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
  }
);

    if (response?.status === 201) {
      toast.success("Employer profile created successfully.");
      dispatch(setIsRegistered(true));
      dispatch(setRole("employer"));
      navigate("/");
    } else {
      toast.error(response?.data?.message || "Failed to create employer profile.");
    }
  } catch (error) {
    console.error("Error setting employer details:", error);
    // If axios error, you can inspect error.response to get server message
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Server error occurred while creating profile.");
    }
  } finally {
    dispatch(setLoading(false));
  }
}

export async function setUserProfile(
  dispatch,
  navigate,
  firstname,
  lastname,
  age,
  male,
  city,
  state,
  country,
  tenthPercentage,
  twelfthPercentage,
  undergrad_cgpa,
  undergrad_institute,
  postgrad_cgpa,
  postgrad_institute,
  undergrad_degree,
  postgrad_degree,
  pdfFile,   // File object (required)
  imageFile   // File object (optional)
) {
  // Basic validation: require firstname, lastname, and resume pdf
  if (!firstname || !lastname || !pdfFile) {
    toast.error("Please fill required fields and upload your resume (PDF).");
    return;
  }

  dispatch(setLoading(true));

  try {
    const formData = new FormData();
    // Append text fields (convert undefined/null to empty string)
    formData.append("firstname", firstname ?? "");
    formData.append("lastname", lastname ?? "");
    // Only append numbers/strings as they are — backend will coerce/normalize
    formData.append("age", age ?? "");
    // Backend expects "male" as boolean/string 'true' or 'false'
    formData.append("male", (male === true || male === "true") ? "true" : "false");
    formData.append("city", city ?? "");
    formData.append("state", state ?? "");
    formData.append("country", country ?? "");
    formData.append("tenthPercentage", tenthPercentage ?? "");
    formData.append("twelfthPercentage", twelfthPercentage ?? "");
    formData.append("undergrad_cgpa", undergrad_cgpa ?? "");
    formData.append("undergrad_institute", undergrad_institute ?? "");
    formData.append("postgrad_cgpa", postgrad_cgpa ?? "");
    formData.append("postgrad_institute", postgrad_institute ?? "");
    formData.append("undergrad_degree", undergrad_degree ?? "");
    formData.append("postgrad_degree", postgrad_degree ?? "");

    // Append required PDF and optional image
    // Use field names expected by backend: 'pdfFile' and 'imageFile'
    formData.append("pdfFile", pdfFile);
    if (imageFile) formData.append("imageFile", imageFile);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      dispatch(setLoading(false));
      return;
    }

    const response = await apiConnector(
      "POST",
      SET_USER_DETAILS_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    // Backend returns 200 on success
    if (response?.status === 200) {
      toast.success("Profile updated successfully.");
      dispatch(setIsRegistered(true));
      dispatch(setRole("user"));
      navigate("/");
      return response.data;
    } else {
      toast.error(response?.data?.message || "Failed to create profile.");
      return null;
    }
  } catch (error) {
    console.error("Error setting user profile:", error);
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Server error occurred while creating profile.");
    }
    return null;
  } finally {
    dispatch(setLoading(false));
  }
}

export async function getUser(dispatch,token2)
{
try{

const token = localStorage.getItem("token") || token2 ; 
console.log(token);

const response = await apiConnector(
  "GET",
  GET_USER_DETAILS_API,
  null,
 { Authorization: `Bearer ${token}`,}
);
dispatch(setIsRegistered(true));
return response;
}
catch(error)
{
  console.log(error);
}}