import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("https://api.thriftaidforall.com/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        //empty for the moment 
      }
    });
};

export const updateProfile = (updatedProfile) => dispatch => {
  axios
    .post("https://api.thriftaidforall.com/api/users/profile", updatedProfile)
    .then(res => {
      console.log("Profile updated successfully:", res.data);
      dispatch(setCurrentUser(res.data));
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};


export const createPosting = (postingData) => (dispatch) => {
  // Set the Authorization header with the JWT token
  const token = localStorage.getItem("jwtToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios
    .post("https://api.thriftaidforall.com/api/postings/create", postingData)
    .then((res) => {
      // Update the user object in the Redux store

    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};


export const loginUser = userData => dispatch => {
  axios
    .post("https://api.thriftaidforall.com/api/users/login", userData)
    .then(res => {
      // Save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Dispatch the setCurrentUser action with the decoded user data
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

