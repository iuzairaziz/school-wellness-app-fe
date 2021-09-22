import React from "react";
import "./Login.scss";
import { Formik } from "formik";
import adminValidation from "../../../validations/adminValidation";
import adminService from "../../../services/adminService";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo1.png";

const Login = (props) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={adminValidation.SignIn}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        adminService.login(values.email, values.password).then((res) => {
          adminService.handleCustomMessage("Logged In Successfully");
          props.history.push("/user");
          window.location.reload();
        });
      }}
    >
      {(props) => {
        return (
          <div class="container login-conatiner">
            <div class="row justify-content-center flex-direction-column  login-row">
              <div class="col-md-6 my-auto">
                <div class="card">
                  <div class="box">
                    <img src={Logo} height="120" width="120" alt="logo" />
                    <div class="gapp">
                      <p class="text-muted textt">
                        Please enter your login and password!
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        onChange={props.handleChange("email")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.email && props.errors.email}
                      </span>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        onChange={props.handleChange("password")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.password && props.errors.password}
                      </span>
                    </div>
                    <Link to="/password-reset" class="forgot text-muted textt">
                      Forgot password?
                    </Link>
                    <input
                      type="submit"
                      onClick={props.handleSubmit}
                      name=""
                      value="Login"
                      href="#"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
