import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../config/configuration";

class AnswerSpanishServices {
  constructor() {
    this.config = new Configuration();
  }

  addAnswers = (
    QuestionOne,
    QuestionTwo,
    QuestionThree,
    QuestionFour,
    AnswerOne,
    AnswerTwo,
    AnswerThree,
    AnswerFour,
    LastName,
    Grade,
    Phone,
    PersonComp,
    Purpose,
    user,
    familyMember,
    userName,
    FirstName
  ) =>
    new Promise((resolve, reject) => {
      axios
        .post(this.config.apiBaseUrl + "answers-spanish", {
          QuestionOne,
          QuestionTwo,
          QuestionThree,
          QuestionFour,
          AnswerOne,
          AnswerTwo,
          AnswerThree,
          AnswerFour,
          LastName,
          Grade,
          Phone,
          PersonComp,
          Purpose,
          user,
          familyMember,
          userName,
          FirstName,
        })
        .then((res) => {
          // localStorage.setItem("token", token.data);
          resolve(res);
        })
        .catch((err) => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reject(err);
        });
    });

  getAnswers = (month) => {
    return axios.get(
      this.config.apiBaseUrl + `answers-spanish/?startMonth=${month}`
    );
  };

  deleteAnswers() {
    return axios.delete(this.config.apiBaseUrl + "answers-spanish/monthly");
  }

  handleMessage(type) {
    if (type === "add") toast("Success!");
    else if (type === "delete") toast("Successfully deleted Answers");
    else if (type === "noData") toast("No Records Found");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

let answerSpanishServices = new AnswerSpanishServices();

export default answerSpanishServices;
