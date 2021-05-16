import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

export const initialState = {
  token: null,
  error: null,
  loading: false,
  showMessage: false,
  showSignUpMessage: false,
};

const authStart = (state, action) => {
  console.log(actionTypes.AUTH_START);
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  console.log(actionTypes.AUTH_SUCCESS);
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  console.log(actionTypes.AUTH_FAIL);
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  console.log(actionTypes.AUTH_LOGOUT);
  return updateObject(state, {
    token: null,
  });
};

const showMessage = (state, action) => {
  return updateObject(state, {
    showMessage: !state.showMessage,
  });
};

const showSignUpMessage = (state, action) => {
  return updateObject(state, {
    showSignUpMessage: !state.showSignUpMessage,
  });
};

const showLoadingIndicator = (state, action) => {
  return updateObject(state, {
    loading: !state.loading
  })
}


const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.SHOW_MESSAGE:
      return showMessage(state, action);
    case actionTypes.SHOW_SIGNUP_MESSAGE:
      return showSignUpMessage(state, action);
    case actionTypes.SHOW_LOADING_INDICATOR:
      return showLoadingIndicator(state, action);
    default:
      return state;
  }
};

export default reducer;
