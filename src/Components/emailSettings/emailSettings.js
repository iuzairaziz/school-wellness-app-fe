import React, { useState } from "react";
import "./emailSetting.scss";
import { Formik, setNestedObjectValues } from "formik";
import adminValidation from "../../validations/adminValidation";
import emailSettingService from "../../services/emailSettingService";
import { toast } from "react-toastify";
import MultipleDatePicker from "react-multiple-datepicker";
import moment from "moment";

const AddAdmin = (props) => {
  let sideBarState = props.state;
  const editable = props.editable;
  const admin = props.admin;
  const toggleEdit = props.toggleEdit;
  const toggleOpen = props.toggleOpen;
  const [date, setDate] = useState([]);

  return (
    <Formik
      initialValues={{
        dates: editable && admin.firstName,
      }}
      //   validationSchema={adminValidation.newAdminValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        emailSettingService
          .addDates({ Date: date })
          .then((res) => {
            emailSettingService.handleCustomMessage("Setting Saved");
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
            <h2 className="headings">Email Settings</h2>
            <h6>
              Note : Date Selected Below Users Will Not Receive Remainder Emails
              On Selected Dates
            </h6>
            <div className="bt-sub">
              <label>Select Dates</label>
              <MultipleDatePicker
                onSubmit={(dates) => {
                  let arr = [];
                  dates.map((item) => {
                    arr.push(moment(item).format("YYYY MM DD"));
                  });
                  setDate(arr);
                }}
              />
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
