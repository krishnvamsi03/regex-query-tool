import axios from "axios"

export const generatePasswordResetLink = (emailid) => {
    if (emailid && 0 < emailid) {
        axios.post("http://128.0.0.1:8000/api/resetPassword", {emailid: emailid}).then((response)=>{
            if(response && response.data) {
                return true;
            }
        }).catch((error) => {
            return false;
        })
    }
}