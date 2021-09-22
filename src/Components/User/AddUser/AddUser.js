import React from "react";
import "./AddUser.scss";
import { Formik } from "formik";
import userServices from "../../../services/userService";
import userValidation from "../../../validations/userValidation";
import { toast } from "react-toastify";

const AddUser = (props) => {
  let sideBarState = props.state;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={userValidation.newUserbyAdminValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        userServices
          .addUser({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          })
          .then((res) => {
            userServices.handleCustomMessage("Registration Successfully");
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
          <div className="container add-user">
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  props.state === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Last Name
              </label>
              <div
                className={`${props.state === true ? "col-sm-10" : "col-sm-8"}`}
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
                <span id="err" className="invalid-feedback">
                  {props.touched.lastName && props.errors.lastName}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  props.state === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                First Name
              </label>
              <div
                className={`${props.state === true ? "col-sm-10" : "col-sm-8"}`}
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
                <span id="err" className="invalid-feedback">
                  {props.touched.firstName && props.errors.firstName}
                </span>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  props.state === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Email
              </label>
              <div
                className={`${props.state === true ? "col-sm-10" : "col-sm-8"}`}
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
                <span id="err" className="invalid-feedback">
                  {props.touched.email && props.errors.email}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center bt-sub">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg"
                onClick={props.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddUser;
