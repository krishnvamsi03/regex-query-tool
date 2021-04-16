import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    token: token,
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout);
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/login", {
        username: username,
        passward: password,
      })
      .then((response) => {
        if (response && response.data) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "expirationTime",
            new Date(new Date().getTime() + 3600 * 1000)
          );
          dispatch(authSuccess(response.data.token));
          let dispatchTimeOut = checkAuthTimeOut(3600);
          dispatchTimeOut(dispatch);
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authSignUp = (username, email, password, confirmPassword) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/signup", {
        username: username,
        email: email,
        passward: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        if (response && response.data) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "expirationTime",
            new Date(new Date().getTime() + 3600 * 1000)
          );
          dispatch(authSuccess(response.data.token));
          dispatch(checkAuthTimeOut(3600));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
