import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

export const initialState = {
  token: null,
  error: null,
  loading: false,
  showMessage: false,
  showSignUpMessage: false,
  saveRegexs: [],
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
    loading: !state.loading,
  });
};

const fetchRegex = (state, action) => {
  return updateObject(state, {
    saveRegexs: action.saveRegexs,
  });
};

const showHideCard = (state, action, Id) => {
  let list = [...state.saveRegexs];
  for (let item of list) {
    if (item.id === Id) {
      item.showCard = !item.showCard;
    }
  }
  return updateObject(state, {
    saveRegexs: list,
  });
};

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
    case actionTypes.FETCH_REGEX:
      return fetchRegex(state, action);
    case actionTypes.DELETE_REGEX:
      return fetchRegex(state, action);
    case actionTypes.SHOW_HIDE_CARD:
      return showHideCard(state, action, action.Id);
    default:
      return state;
  }
};

export default reducer;
