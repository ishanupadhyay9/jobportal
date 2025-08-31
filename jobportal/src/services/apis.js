const BASE_URL = 'https://final-year-project-backend-0q17.onrender.com/api'

// AUTH ENDPOINTS
export const authEndpoints = {
  USER_REGISTER_API: BASE_URL + "/auth/user/register",
  USER_LOGIN_API: BASE_URL + "/auth/user/login",
  EMPLOYER_REGISTER_API: BASE_URL + "/auth/employer/register",
  EMPLOYER_LOGIN_API: BASE_URL + "/auth/employer/login",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/user",
  SET_USER_DETAILS_API: BASE_URL + "/profile/user",
  GET_EMP_DETAILS_API: BASE_URL + "/profile/employer",
  SET_EMP_DETAILS_API: BASE_URL + "/profile/employer",
}

// STUDENTS ENDPOINTS
export const jobEndPoints = {
  CREATE_JOB_API: BASE_URL + "/jobs/createjob"
}