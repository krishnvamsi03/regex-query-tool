import axios from "axios";

export function loginUser(event) {
  if (null != event) {
    let oUserName = document.getElementById("loginInput");
    let oPassword = document.getElementById("passwordInput");
    if (oUserName && oPassword) {
      axios
        .post("https://regex-query-tool-backend.herokuapp.com/api/login", {
          username: oUserName.value,
          passward: oPassword.value,
        })
        .then((response) => {
          if (response) {
            alert(response.data.Response);
          }
        });
    }
  }
}
