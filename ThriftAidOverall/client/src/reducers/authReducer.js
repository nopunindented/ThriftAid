import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {
    establishmentname: "",
    phonenumber: "",
    website: ""
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("SET_CURRENT_USER action payload:", action.payload); // Debugging statement
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}