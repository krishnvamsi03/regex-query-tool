import axios from "axios";
export function validateUserName(event) {
  if (null != event) {
    let sValue = event.target.value;
    if (sValue && 0 < sValue.length) {
      let rLengthExpress = /^(?=.{8,20})/g;
      if (!sValue.match(rLengthExpress)) {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        let oInValidDiv = document.getElementById("userNameInvalid");
        if (oInValidDiv) {
          oInValidDiv.innerText = "Username should be 8-20 character";
        }
      } else if (!sValue.match(/^[a-zA-Z0-9._]*$/)) {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        let oInValidDiv = document.getElementById("userNameInvalid");
        if (oInValidDiv) {
          oInValidDiv.innerText =
            "Username should contain alpha numeric characters only.";
        }
      } else {
        axios
          .post("https://regex-query-tool-backend.herokuapp.com/api/getusername", { username: sValue })
          .then((response) => {
            if (response.data.taken) {
              event.target.classList.remove("is-valid");
              event.target.classList.add("is-invalid");
              let oInValidDiv = document.getElementById("userNameInvalid");
              if (oInValidDiv) {
                oInValidDiv.innerText = "Username is already taken";
              }
            } else {
              event.target.classList.remove("is-invalid");
              event.target.classList.add("is-valid");
              let oInValidDiv = document.getElementById("userNameValid");
              if (oInValidDiv) {
                oInValidDiv.innerText = "";
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
}

export function validateEmailId(event) {
  if (null != event) {
    let rEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let sValue = event.target.value;
    if (sValue && 0 < sValue.length) {
      let oInValidDiv = document.getElementById("invalidEmail");
      if (!sValue.match(rEmailRegex)) {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        if (oInValidDiv) {
          oInValidDiv.innerText = "Invalid Email ID";
        }
      } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
      }
    }
  }
}

export function validatePassword(event) {
  if (null != event) {
    let rPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    let sValue = event.target.value;
    if (sValue && 0 < sValue.length) {
      let oInValidDiv = document.getElementById("invalidPassword");
      if (!sValue.match(rPasswordRegex)) {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        if (oInValidDiv) {
          oInValidDiv.innerText =
            "Password should contain at least\n" +
            "One Uppercase letter\n" +
            "One lowercase letter\n" +
            "One Number\n" +
            "One special character\n";
        }
      } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
      }
    }
  }
}

export function validateConfirmPassword(event) {
  if (null != event) {
    let sValue = event.target.value;
    if (sValue && 0 < sValue.length) {
      let oPassword = document.getElementById("passwordInput");
      if (oPassword) {
        if (sValue !== oPassword.value) {
          event.target.classList.remove("is-valid");
          event.target.classList.add("is-invalid");
          let oInValidDiv = document.getElementById("invalidConfirmPassword");
          if (oInValidDiv) {
            oInValidDiv.innerText = "Passwords must match.";
          }
        } else {
          event.target.classList.remove("is-invalid");
          event.target.classList.add("is-valid");
        }
      }
    }
  }
}
