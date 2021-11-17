import React from "react";
import "./Optout.scss";
import Check from "../../images/check.png";
import Logo from "../../images/logo1.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import userServices from "../../services/userService";

const Optout = (props) => {
  console.log(props);
  let userId = props.match.params.id;
  useEffect(() => {
    userServices.updateUserEdit(userId, {
      recieveEmail: "No",
    });
  }, []);
  return (
    <div className="cotainer greeting">
      <div className="row">
        <div class="col-md-6 logo">
          <img src={Logo} height="250" width="250" alt="logo" />
        </div>
      </div>
      <div className="row mt-2">
        <h1 className="thanks">Thank you for using our service</h1>
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
