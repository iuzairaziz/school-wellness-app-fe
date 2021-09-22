import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Configuration from "../config/configuration";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

class AdminServices {
  constructor() {
    this.config = new Configuration();
  }

  register = (firstName, lastName, email, password) =>
    new Promise((resolve, reject) => {
      axios
        .post(this.config.apiBaseUrl + "admin", {
          firstName,
          lastName,
          email,
          password,
        })
        .then((token) => {
          // localStorage.setItem("token", token.data);
          resolve(token);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reject(err);
        });
    });

  login = (email, password) =>
    new Promise((resolve, reject) => {
      axios
        .post(this.config.apiBaseUrl + "admin/login", {
          email,
          password,
        })
        .then((token) => {
          localStorage.setItem("token", token.data);
          resolve(token);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reject(err);
        });
    });

  logout = () => {
    localStorage.removeItem("token");
  };

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  userLoggedInInfo = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwt_decode(jwt);
    } catch (ex) {
      return null;
    }
  };

  getUsers = () => {
    return axios.get(this.config.apiBaseUrl + "admin");
  };

  getUserById(id) {
    return axios.get(this.config.apiBaseUrl + "users/" + id);
  }

  deleteUsers(id) {
    return axios.delete(this.config.apiBaseUrl + "admin/" + id);
  }

  updateAllUserFields = (id, firstName, lastName, email, password) =>
    axios.put(
      this.config.apiBaseUrl + `admin/${id}`,
      firstName,
      lastName,
      email,
      password
    );

  isUserRole = (array) => {
    let user = this.userLoggedInInfo();
    // console.log("role ", user);
    // console.log("roles", array);
    // console.log("role auth", array.includes(user.userRole));
    return array.includes(user.userRole);
  };

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

let adminServices = new AdminServices();

export default adminServices;
