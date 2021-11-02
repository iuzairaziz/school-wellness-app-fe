import React, { useState, useEffect } from "react";
import "./addRemoveFamilyMemeber.scss";
import { Formik } from "formik";
import userServices from "../../services/userService";
import Logo from "../../images/logo.png";
import { useHistory, Link } from "react-router-dom";
import shortValidation from "../../validations/shortValidations";
import InputList from "../DynamicInputField/InputList";
import { toast } from "react-toastify";

const AddRemoveFamilyMemeber = (props) => {
  const [user, setUser] = useState();

  const history = useHistory();
  const [familyDetails, setFamilyDetails] = useState([
    {
      index: Math.random(),
      familyDetails: "",
    },
  ]);

  let userId =
    props.match.params && props.match.params.id ? props.match.params.id : null;

  useEffect(() => {
    getSingleUser();
  }, []);

  const getSingleUser = () => {
    userServices
      .getSingleUser(userId)
      .then((res) => {
        setUser(res.data);
        setFamilyDetails(res.data.familyMembers);
        console.log("user details", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <div className={`${props.state === true ? "col-10" : "col-8"}`}>
    <div class="container consent-form">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6 logo">
          <img src={Logo} height="110" width="300" alt="logo" />
        </div>
      </div>

      <Formik
        initialValues={{
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
          email: user ? user.email : "",
          familyMembers: "",
          recieveEmail: "Yes",
        }}
        enableReinitialize={true}
        validationSchema={shortValidation.newConsentFormValidation}
        onSubmit={(values, actions) => {
          console.log("Valuessss", user);
          userServices
            .updateSingleUser(userId, {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              recieveEmail: values.recieveEmail,
              familyMembers: familyDetails,
            })
            .then((res) => {
              // history.push("/greeting");
              userServices.handleCustomMessage("Update Info Successful");
              console.log("values.recieveEmail", values.recieveEmail);
            })
            .catch((err) => {
              toast.error(err.response.data, {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
          console.log("values.recieveEmail", values.recieveEmail);
        }}
      >
        {(props) => {
          return (
            <div class="card-gap">
              <div class="card card-sty">
                <div class="card-body">
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label alignn aliggn"
                      style={{ textAlign: "initial" }}
                    >
                      Last Name
                    </label>
                    <div class="col-sm-9">
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
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label"
                      style={{ textAlign: "initial" }}
                    >
                      First Name
                    </label>
                    <div class="col-sm-9">
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
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label"
                      style={{ textAlign: "initial" }}
                    >
                      Email
                    </label>
                    <div class="col-sm-9">
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
                </div>
              </div>
              <div className="row"></div>
              <div class="card col-12 add-fam">
                <span className="mb-2">
                  <b>Family Member(s)</b>
                </span>
                <div class="input-group mb-3">
                  <InputList
                    setFamilyDetails={setFamilyDetails}
                    familyDetails={familyDetails}
                    // editable={editable}
                  />
                </div>
              </div>

              <div class="col d-flex justify-content-center mt-3">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  onClick={() => {
                    props.handleSubmit();
                    // console.log("consent", consent);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
      <div class="row gappp">
        <input
          class="form-control warn"
          type="text"
          value="To opt out, do not accept or provide information "
          aria-label="readonly input example"
          readonly="true"
        />
      </div>
    </div>
    // </div>
  );
};

export default AddRemoveFamilyMemeber;
