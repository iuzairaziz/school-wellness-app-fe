import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../config/configuration";

class PasswordResetService {
  constructor() {
    this.config = new Configuration();
  }

  sendPasswordReset(email) {
    return axios.post(this.config.apiBaseUrl + "password-reset", email);
  }
  resetPassword(password, adminId, token) {
    return axios.post(
      this.config.apiBaseUrl + `password-reset/${adminId}/${token}`,
      password
    );
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Registered!");
    else if (type === "update") toast("Successfully updated User");
    else if (type === "delete") toast("Successfully deleted User");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

let passwordResetService = new PasswordResetService();

export default passwordResetService;
