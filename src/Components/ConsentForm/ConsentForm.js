import React, { useState, useEffect } from "react";
import "./ConsentForm.scss";
import { Formik } from "formik";
import userServices from "../../services/userService";
import Logo from "../../images/logo.png";
import { useHistory, Link } from "react-router-dom";
import shortValidation from "../../validations/shortValidations";
import InputList from "../DynamicInputField/InputList";
import { toast } from "react-toastify";

const ConsentForm = (props) => {
  const history = useHistory();
  const [familyDetails, setFamilyDetails] = useState([
    {
      index: Math.random(),
      familyDetails: "",
    },
  ]);

  const [consent, setConsent] = useState();
  let userId =
    props.match.params && props.match.params.userId
      ? props.match.params.userId
      : null;
  let lastName =
    props.match.params && props.match.params.lastName
      ? props.match.params.lastName
      : null;
  let firstName =
    props.match.params && props.match.params.firstName
      ? props.match.params.firstName
      : null;
  let email =
    props.match.params && props.match.params.email
      ? props.match.params.email
      : null;
  return (
    // <div className={`${props.state === true ? "col-10" : "col-8"}`}>
    <div class="container consent-form">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6 logo">
          <img src={Logo} height="200" width="200" alt="logo" />
        </div>
      </div>
//       <div className="row bt-set">
//         <div className="col bt-sett">
//           <div class="btn-group">
//             <a href="#" class="btn btn-primary active" aria-current="page">
//               English
//             </a>
//             <Link
//               to={
//                 userId
//                   ? `/consentform-spanish/${userId}/${firstName}/${lastName}/${email}`
//                   : `/consentform-spanish`
//               }
//             >
//               <a
//                 // href={`/consentform-spanish/${userId}/${firstName}/${lastName}/${email}`}
//                 class="btn btn-primary btc"
//               >
//                 Spanish
//               </a>
//             </Link>
//           </div>
//         </div>
//       </div>

      <div class="row gappp">
        <p>
          By pressing accept below, you consent to Vista Christian School's use
          of the information you provide by means of this automated app for
          purposes of monitoring your health (and other family members) as it
          applies to the Covid 19 virus reporting requirements. Thank you for
          helping us to keep our campus safe. Please review your data/wireless plan for any applicable charges and
            your rights under the California Consumer Privacy Act (CCPA) |
 <a href="https://www.oag.ca.gov/privacy/ccpa" target="_blank">
          State of California - Department of Justice - Office of the Attorney General.
          </a>
        </p>
        <p>
          Additional privacy information can be found here:
          <a href="https://safebusinesssolutions.com/" target="_blank">
            {" "}
            Privacy Policy | Safe Business Solutions Thru Customer Service.
          </a>
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: props.match.params ? props.match.params.firstName : "",
          lastName: props.match.params ? props.match.params.lastName : "",
          email: props.match.params ? props.match.params.email : "",
          familyMembers: "",
          recieveEmail: "",
        }}
        validationSchema={shortValidation.newConsentFormValidation}
        onSubmit={(values, actions) => {
          console.log("Valuessss", values);
          userServices
            .addUser({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              recieveEmail: consent === true ? "Yes" : "No",
              userId: userId,
              familyMembers: familyDetails,
            })
            .then((res) => {
              history.push("/greeting");
              userServices.handleCustomMessage("Registration Successful");
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
                      class="col-sm-2 col-form-label alignn"
                      // className="alignn"
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
                      class="col-sm-2 col-form-label alignn"
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
                      class="col-sm-2 col-form-label alignn"
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

              <div class="col d-flex justify-content-center mt-3 safari">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  onClick={() => {
                    setConsent(true);
                    props.handleSubmit();
                    // console.log("consent", consent);
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-lg reject-bt"
                  onClick={() => {
                    setConsent(false);
                    props.handleSubmit();
                    // console.log("consent F", consent);
                  }}
                >
                  Reject
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
  );
};

export default ConsentForm;
