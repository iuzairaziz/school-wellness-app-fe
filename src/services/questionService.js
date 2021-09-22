import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../config/configuration";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

class QuestionServices {
  constructor() {
    this.config = new Configuration();
  }

  addQuestions(formData) {
    return axios.post(this.config.apiBaseUrl + "question", formData);
  }

  getQuestions = () => {
    return axios.get(this.config.apiBaseUrl + "question");
  };

  getQuestionsById(id) {
    return axios.get(this.config.apiBaseUrl + "question/" + id);
  }

  deleteQuestions(id) {
    return axios.delete(this.config.apiBaseUrl + "question/" + id);
  }

  updateAllQuestionsFields = (id) =>
    axios.put(this.config.apiBaseUrl + `question/${id}`);

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

let questionServices = new QuestionServices();

export default questionServices;
