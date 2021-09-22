import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../config/configuration";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

class CurrentQuestionServices {
  constructor() {
    this.config = new Configuration();
  }

  addCurrentQuestions(formData) {
    return axios.post(this.config.apiBaseUrl + "current-question", formData);
  }

  getCurrentQuestions = () => {
    return axios.get(this.config.apiBaseUrl + "current-question");
  };

  getCurrentQuestionsById(id) {
    return axios.get(this.config.apiBaseUrl + "current-question/" + id);
  }

  deleteCurrentQuestions(id) {
    return axios.delete(this.config.apiBaseUrl + "current-question/" + id);
  }

  updateAllQuestionsFields = (id) =>
    axios.put(this.config.apiBaseUrl + `current-question/${id}`);

  handleMessage(type) {
    if (type === "add") toast("Successfully Added Questions!");
    else if (type === "update") toast("Successfully updated Question");
    else if (type === "delete") toast("Successfully deleted Question");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

let currentQuestionServices = new CurrentQuestionServices();

export default currentQuestionServices;
