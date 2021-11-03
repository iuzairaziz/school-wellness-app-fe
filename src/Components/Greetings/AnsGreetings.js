import React from "react";
import "./Greetings.scss";
import Check from "../../images/check.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AnsGreetings = () => {
  const date = new Date();
  const location = useLocation();
  const history = useHistory();

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

      {location.state.user.familyMembers[0].familyDetails != "" ? (
        <div className="row mt-3">
          <button
            onClick={() => {
              history.push({
                pathname: `/answer/add/${location.state.user._id}/${location.state.userName}`,
                state: { familyMember: 1 },
              });
            }}
            type="button"
            class="btn btn-success btn-lg"
          >
            Fill Questionare For Family Member
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AnsGreetings;
