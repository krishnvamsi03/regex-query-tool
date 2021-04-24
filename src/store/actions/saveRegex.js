import axios from "axios";

export const saveRegexs = (token, regexName, regexPattern, regexLanguage) => {
  if (token) {
    axios
      .post("http://127.0.0.1:8000/api/saveregex", {
        token: token,
        regexName: regexName,
        regexPattern: regexPattern,
        regexLanguage: regexLanguage
      })
      .then((response) => {
        if (response && response.data) {

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
