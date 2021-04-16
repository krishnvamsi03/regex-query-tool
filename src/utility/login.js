import axios from "axios";

export function loginUser(event) {
  if (null != event) {
    let oUserName = document.getElementById("loginInput");
    let oPassword = document.getElementById("passwordInput");
    if (oUserName && oPassword) {
      axios
        .post("http://127.0.0.1:8000/api/login", {
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
