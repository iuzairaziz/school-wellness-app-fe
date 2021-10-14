import React from "react";
import "./Greetings.scss";
import Check from "../../images/check.png";
import { Link } from "react-router-dom";
import moment from "moment";

const AnsGreetings = () => {
  const date = new Date();

  return (
    <div className="cotainer greeting">
      <div className="row">
        <div class="col-md-6 logo">
          <img src={Check} height="180" width="180" alt="logo" />
        </div>
      </div>
      <div className="row mt-2 datee">
        <h3>{moment(date).format("MMMM Do YYYY, h:mm a")}</h3>
        <h1 className="thanks">Thank you for your answers</h1>
      </div>
    </div>
  );
};

export default AnsGreetings;
