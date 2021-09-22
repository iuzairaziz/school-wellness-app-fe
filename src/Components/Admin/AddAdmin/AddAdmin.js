import React from "react";
import "./AddAdmin.scss";
import { Formik } from "formik";
import adminValidation from "../../../validations/adminValidation";
import adminService from "../../../services/adminService";
import { toast } from "react-toastify";

const AddAdmin = (props) => {
  let sideBarState = props.state;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // userRole: "",
      }}
      validationSchema={adminValidation.newAdminValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        adminService
          .register(
            values.firstName,
            values.lastName,
            values.email,
            values.password
            // values.userRole
          )
          .then((res) => {
            adminService.handleCustomMessage("Registration Successfully");
            // this.props.history.push("/");
            // window.location.reload();
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
          <div className="container add-admin">
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Last Name
              </label>

              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="text"
                  onBlur={props.handleBlur}
                  name="lastName"
                  className="form-control"
                  id="staticEmail"
                  placeholder="Enter Last Name"
                  value={props.values.lastName}
                  onChange={props.handleChange("lastName")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.lastName && props.errors.lastName}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                First Name
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="text"
                  onBlur={props.handleBlur}
                  name="firstName"
                  className="form-control"
                  id="staticEmail"
                  placeholder="Enter First Name"
                  value={props.values.firstName}
                  onChange={props.handleChange("firstName")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.firstName && props.errors.firstName}
                </span>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Email
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="text"
                  onBlur={props.handleBlur}
                  name="email"
                  className="form-control"
                  id="staticEmail"
                  placeholder="Please Enter Email"
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.email && props.errors.email}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="inputPassword"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Password
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="password"
                  onBlur={props.handleBlur}
                  name="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Enter Password"
                  value={props.values.password}
                  onChange={props.handleChange("password")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.password && props.errors.password}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="inputPassword"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Re-Enter Password
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="password"
                  onBlur={props.handleBlur}
                  name="confirmPassword"
                  className="form-control"
                  id="inputConfirmPassword"
                  placeholder="Please Confirm Password"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange("confirmPassword")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center bt-sub">
              <button
                type="button"
                onClick={props.handleSubmit}
                className="btn btn-outline-primary btn-lg"
              >
                Submit
              </button>
            </div>
            {console.log(sideBarState)}
          </div>
        );
      }}
    </Formik>
  );
};

export default AddAdmin;
