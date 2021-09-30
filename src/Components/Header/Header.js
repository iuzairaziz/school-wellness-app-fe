import React from "react";
import Logo from "../../images/logo1.png";
import "./Header.scss";
import { FiLogOut } from "react-icons/fi";
import adminServices from "../../services/adminService";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();
  return (
    <div class="header">
      <nav class="navbar navbar-light bg-light">
        <div class="col-10 imgg">
          {" "}
          <img src={Logo} alt="" width="100" height="100" />
        </div>
        <div class="col-2">
          <div class="col Logout">
            <b
              onClick={() => {
                adminServices.logout();
                history.push("/login");
              }}
            >
              Logout
            </b>
            <FiLogOut
              size={30}
              width={10}
              class="logout-logo"
              onClick={() => {
                adminServices.logout();
                history.push("/login");
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
