import React from "react";
import "../Auth/Login/Login.scss";
import { Formik } from "formik";
import passwordResetValidation from "../../validations/passwordResetValidation";
import passwordReset from "../../services/passwordReset";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../images/logo1.png";
import "./ForgetPassword.scss";

const Login = (props) => {
  {
    console.log(props.match.params);
  }
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={passwordResetValidation.confirmPasswordValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        passwordReset
          .resetPassword(
            { password: values.password },
            props.match.params.adminId,
            props.match.params.token
          )
          .then((res) => {
            passwordReset.handleCustomMessage("Password Reset Successfully");
            props.history.push("/login");
            window.location.reload();
          })
          .catch((err) => {
            toast.error(err.response.data, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }}
    >
      {(props) => {
        return (
          <div class="container login-conatiner pass-reset">
            <div class="row justify-content-center flex-direction-column  login-row">
              <div class="col-md-6 my-auto">
                <div class="card">
                  <div class="box">
                    <img src={Logo} height="120" width="120" alt="logo" />
                    {/* <h1>Login</h1> */}
                    <div class="gapp">
                      <p class="text-muted textt">
                        Please enter your new password!
                      </p>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        onChange={props.handleChange("password")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.password && props.errors.password}
                      </span>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        onBlur={props.handleBlur}
                        value={props.values.confirmPassword}
                        onChange={props.handleChange("confirmPassword")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.confirmPassword &&
                          props.errors.confirmPassword}
                      </span>
                    </div>

                    <input
                      type="submit"
                      onClick={props.handleSubmit}
                      name=""
                      value="Submit"
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
