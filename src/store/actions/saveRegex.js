import axios from "axios";

export const saveRegexs = async (
  token,
  regexName,
  regexPattern,
  regexLanguage
) => {
  if (token) {
    let message = "";
    await axios
      .post("http://127.0.0.1:8000/api/saveregex", {
        token: token,
        regexName: regexName,
        regexPattern: regexPattern,
        regexLanguage: regexLanguage,
      })
      .then((response) => {
        if (response && response.data && 200 === response.status) {
          message = response.data.response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return message;
  }
};

export const deleteRegex = async (token, id) => {
  if (token) {
    let message = "";
    await axios
      .post("http://127.0.0.1:8000/api/delete", {
        token: token,
        savedRegexId: id,
      })
      .then((response) => {
        if (response && response.data && 200 === response.status) {
          message = response.data.response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return message;
  }
};
