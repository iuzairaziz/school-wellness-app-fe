import React from "react";
import "./Optout.scss";
import Check from "../../images/check.png";
import Logo from "../../images/logo1.png";
import { Link } from "react-router-dom";

const Optout = () => {
  return (
    <div className="cotainer greeting">
      <div className="row">
        <div class="col-md-6 logo">
          <img src={Logo} height="180" width="450" alt="logo" />
        </div>
      </div>
      <div className="row mt-2">
        <h1>Thank you for using our service</h1>
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

export default Optout;
