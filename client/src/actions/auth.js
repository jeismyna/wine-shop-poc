import * as types from "./types";

const userSignup = (values) => ({
  type: types.AUTH_LOGIN,
  username: values.username,
  password: values.password,
  firstName: values.firstName,
  lastName: values.lastName,
  phone: values.phone,
  address: values.address,
});

const userReset = () => ({
  type: types.AUTH_LOGOUT,
});


export const doSignup = (values) => (dispatch) => {
  try {
    dispatch(userSignup(values));
  } catch (error) {
    alert(error);
  } finally {
  }
};

export const doReset = () => (dispatch) => {
  dispatch(userReset());
};
