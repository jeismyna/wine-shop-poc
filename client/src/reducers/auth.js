import * as types from "../actions/types";

const userName = localStorage.getItem('user') ? localStorage.getItem('user') : "";
const isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;

const initialState = {
  firstName: userName,
  lastName: "",
  phone: "",
  address: "",
  username: "",
  password: "",
  isLoggedIn: isLoggedIn,
  counter: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        address: action.address,
        isLoggedIn: true,
      };
    case types.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};



export default authReducer;
