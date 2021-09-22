import React from "react";
import "../Auth/Login/Login.scss";
import { Formik } from "formik";
import passwordResetValidation from "../../validations/passwordResetValidation";
import passwordReset from "../../services/passwordReset";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../images/logo1.png";
import "./ForgetPassword.scss";

const EnterEmailAddress = (props) => {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={passwordResetValidation.passwordReset}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        passwordReset
          .sendPasswordReset({ email: values.email })
          .then((res) => {
            passwordReset.handleCustomMessage("Password Reset Email Sent");
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
                        Please enter your email address to reset your password
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

export default EnterEmailAddress;
