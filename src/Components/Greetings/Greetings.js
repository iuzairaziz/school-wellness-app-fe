import React from "react";
import "./Greetings.scss";
import Check from "../../images/check.png";
import { Link } from "react-router-dom";
import moment from "moment";

const Greetings = () => {
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
        <h1 className="thanks">Thank you</h1>
      </div>
      <div className="row mt-3">
        <Link to="/consentform">
          <button type="button" class="btn btn-success btn-lg">
            <b>+</b> Add Member
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Greetings;
