import axios from "axios";
import * as actionTypes from "./actionTypes";
import { deleteRegex } from "./saveRegex";

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

export const showMessage = () => {
  return {
    type: actionTypes.SHOW_MESSAGE,
  };
};

export const showSignUpMessage = () => {
  return {
    type: actionTypes.SHOW_SIGNUP_MESSAGE,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const showLoadingIndicator = () => {
  return {
    type: actionTypes.SHOW_LOADING_INDICATOR,
  };
};

export const showFetchRegex = (saveRegexs) => {
  return {
    type: actionTypes.FETCH_REGEX,
    saveRegexs: saveRegexs,
  };
};

export const onClickShowCard = (Id) => {
  return {
    type: actionTypes.SHOW_HIDE_CARD,
    Id: Id
  };
};

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
      let dispatchFetchRegex = fetchRegex();
      dispatchFetchRegex(dispatch);
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    let invalidUserPass = "Inavlid username or password";
    axios
      .post("https://regex-query-tool-backend.herokuapp.com/api/login", {
        username: username,
        passward: password,
      })
      .then((response) => {
        if (response && response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "expirationTime",
            new Date(new Date().getTime() + 3600 * 1000)
          );
          dispatch(authSuccess(response.data.token));
          dispatch(showMessage());
          setTimeout(() => {
            dispatch(showMessage());
          }, 3000);
          let dispatchFetchRegex = fetchRegex();
          dispatchFetchRegex(dispatch);
          let dispatchTimeOut = checkAuthTimeOut(3600);
          dispatchTimeOut(dispatch);
        } else {
          dispatch(authFail(invalidUserPass));
          dispatch(showMessage());
          setTimeout(() => {
            dispatch(showMessage());
          }, 3000);
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
        dispatch(showMessage());
        setTimeout(() => {
          dispatch(showMessage());
        }, 3000);
      });
  };
};

export const authSignUp = (username, email, password, confirmPassword) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("https://regex-query-tool-backend.herokuapp.com/api/signup", {
        username: username,
        email: email,
        passward: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        if (response && response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "expirationTime",
            new Date(new Date().getTime() + 3600 * 1000)
          );
          dispatch(authSuccess(response.data.token));
          dispatch(showSignUpMessage());
          setTimeout(() => {
            dispatch(showSignUpMessage());
          }, 3000);
          dispatch(checkAuthTimeOut(3600));
        } else {
          dispatch(authFail("Failed to Sign up"));
          dispatch(showSignUpMessage());
          setTimeout(() => {
            dispatch(showSignUpMessage());
          }, 3000);
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
        dispatch(showSignUpMessage());
        setTimeout(() => {
          dispatch(showSignUpMessage());
        }, 3000);
      });
  };
};

export const authCheckState = (dispatch) => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    dispatch(authLogout);
    dispatch(fetchRegex());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationTime"));
    if (expirationDate <= new Date()) {
      dispatch(authLogout);
    } else {
      dispatch(authSuccess(token));
      dispatch(
        checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
    dispatch(fetchRegex());
  }
};

export const fetchRegex = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("https://regex-query-tool-backend.herokuapp.com/api/saved", { token: token })
        .then((response) => {
          if (response && response.data) {
            let list = [];
            for (let item of response.data.list) {
              let temp = {};
              temp["id"] = item.id;
              temp["regexName"] = item.regexname;
              temp["regexPattern"] = item.regexpattern;
              temp["showCard"] = false;
              list.push(temp);
              dispatch(showFetchRegex(list));
            }
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(showFetchRegex([]));
        });
    } else {
      dispatch(showFetchRegex([]));
    }
  };
};

export const deleteRegexById = (Id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(showLoadingIndicator());
      await deleteRegex(token, Id);
      let dispatchFetchRegex = fetchRegex();
      dispatchFetchRegex(dispatch);
      dispatch(showLoadingIndicator());
    }
  };
};
