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
  UPDATE_USER_DETAILS_API: BASE_URL +"/profile/user",
  UPDATE_EMP_DETAILS_API: BASE_URL +"/profile/employer"
}

// STUDENTS ENDPOINTS
export const jobEndPoints = {
  CREATE_JOB_API: BASE_URL + "/jobs/createjob",
  GET_ALL_JOBS_API: BASE_URL + "/jobs/showjobs",
  GET_EMPLOYER_JOBS_API: BASE_URL +"/jobs/showjobs/employer",
  GET_JOB_DETAILS: BASE_URL + "/jobs/showjobs",
  APPLY_JOB_API: BASE_URL + "/jobs/apply",
  GET_USER_JOBS_API: BASE_URL +"/jobs/showjobs/user",
  SEARCH_JOB_API: BASE_URL + "/jobs/search"

}