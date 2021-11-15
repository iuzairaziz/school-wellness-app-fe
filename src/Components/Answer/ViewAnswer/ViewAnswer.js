import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import answerService from "../../../services/answerServices";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ViewAnswer.scss";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { CSVLink } from "react-csv";
import $ from "jquery";

const ViewAnswer = (props) => {
  const [applyfilter, setApplyFilter] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [csvData, setCsvData] = useState("");
  const [dataa, setData] = useState({
    columns: [
      // {
      //   label: "Question 1",
      //   field: "QuestionOne",
      //   sort: "asc",
      // },
      // {
      //   label: "Question 2",
      //   field: "QuestionTwo",
      //   sort: "asc",
      // },

      // {
      //   label: "Question 3",
      //   field: "QuestionThree",
      //   sort: "asc",
      // },
      // {
      //   label: "Question 4",
      //   field: "QuestionFour",
      //   sort: "true",
      // },
      {
        label: "Answer 1",
        field: "AnswerOne",
        sort: "asc",
      },
      {
        label: "Answer 2",
        field: "AnswerTwo",
        sort: "asc",
      },
      {
        label: "Answer 3",
        field: "AnswerThree",
        sort: "asc",
      },
      {
        label: "Answer 4",
        field: "AnswerFour",
        sort: "asc",
      },
      {
        label: "Date",
        field: "createdAt",
        sort: "asc",
        // width: 100,
      },
      {
        label: "User",
        field: "user",
        sort: "asc",
        // width: 100,
      },

      {
        label: "Name",
        field: "LastName",
        sort: "asc",
      },
      {
        label: "Grade",
        field: "Grade",
        sort: "asc",
      },
      {
        label: "Contact",
        field: "Phone",
        sort: "disabled",
        // width: 150,
      },
      {
        label: "Person Completing",
        field: "PersonComp",
        sort: "disabled",
        // width: 150,
      },
      {
        label: "Reason",
        field: "Purpose",
        sort: "disabled",
        // width: 150,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getAllQuestions(applyfilter);
  }, [modalDelete, applyfilter]);
  const changeColor = () => {
    $("tbody > tr").each(function (index) {
      // console.log("trs", this);
      var one = $(this).children("td").eq(1).text();
      var zero = $(this).children("td").eq(0).text();
      var two = $(this).children("td").eq(2).text();
      var three = $(this).children("td").eq(3).text();
      var finalone = parseInt(one);
      var finalzero = parseInt(zero);
      console.log("zero", zero, one, two, three);
      if (!(zero === "Yes" && one === "No" && two === "No" && three === "No")) {
        $(this).css("color", "red");
      } else {
        $(this).css("color", "black");
      }
    });
  };
  $(document).ready(function () {
    changeColor();
    $(document).on("click", "th", function () {
      changeColor();
    });
  });

  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = () => {
    answerService
      .deleteAnswers()
      .then((res) => {
        if (res.data.deletedCount === 0) {
          return answerService.handleMessage("noData");
        } else {
          answerService.handleMessage("delete");
          toggleDelete();
        }
      })
      .catch((err) => {
        answerService.handleError();
        toggleDelete();
        console.log("err", err);
      });
  };

  const getAllQuestions = (month) => {
    answerService
      .getAnswers(month)
      .then((res) => {
        setCsvData(res.data);
        let data = { ...dataa };
        let csvdata = [];
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            AnswerFour: item.AnswerFour ? item.AnswerFour : "none",
            AnswerThree: item.AnswerThree ? item.AnswerThree : "none",
            AnswerTwo: item.AnswerTwo ? item.AnswerTwo : "none",
            AnswerOne: item.AnswerOne ? item.AnswerOne : "none",
            createdAt: item.createdAt
              ? moment(item.createdAt).format("LL")
              : "none",
            Phone: item.Phone ? item.Phone : "none",
            Purpose: item.Purpose ? item.Purpose : "none",
            PersonComp: item.PersonComp ? item.PersonComp : "none",
            LastName: item.LastName ? item.LastName : "none",
            user: item.user ? item.user.email : "User Deleted",
            Grade: item.Grade ? item.Grade : "none",
          });
          csvdata.push({
            AnswerOne: item.AnswerOne ? item.AnswerOne : "none",
            AnswerTwo: item.AnswerTwo ? item.AnswerTwo : "none",
            AnswerThree: item.AnswerThree ? item.AnswerThree : "none",
            AnswerFour: item.AnswerFour ? item.AnswerFour : "none",
            Date: item.createdAt ? moment(item.createdAt).format("LL") : "none",
            User: item.user ? item.user.email : "User Deleted",
            Name: item.LastName ? item.LastName : "none",
            Grade: item.Grade ? item.Grade : "none",
            Contact: item.Phone ? item.Phone : "none",
            PersonCompleting: item.PersonComp ? item.PersonComp : "none",
            Reason: item.Purpose ? item.Purpose : "none",
          });
        });
        setData(data);
        setCsvData(csvdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-answer mt-3">
      <div className="card m-b-20">
        <div className="card-body">
          <div class="headings">
            <div className="col-1">
              <button
                type="button"
                class="btn btn-success btn-lg"
                onClick={() => {
                  // setSelectedAnswers(item);
                  console.log("data", dataa);
                  console.log("CSV Data", csvData);
                }}
              >
                <CSVLink data={csvData} filename="Answers.csv">
                  Export
                </CSVLink>
              </button>
            </div>
            <div className="col-10">
              <h2>List of all Answers</h2>
            </div>
            <div className="col-1">
              <button
                type="button"
                class="btn btn-danger btn-lg"
                onClick={() => {
                  // setSelectedAnswers(item);
                  toggleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="mb-1">
                <b>Month Filter</b>
              </label>
              <select
                className="form-control"
                onChange={(e) => {
                  setApplyFilter(e.target.value);
                }}
                style={{ textAlign: "center" }}
              >
                <option selected>-- Select Month --</option>
                <option value="January">January</option>
                <option value="Feburary">Feburary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>
          <MDBDataTableV5
            responsive
            striped
            onPageChange={(val) => console.log(val)}
            bordered={true}
            materialSearch
            searchTop
            searchBottom={false}
            // pagingTop
            barReverse
            hover
            // scrollX
            autoWidth
            data={dataa}
            theadColor="#000"
          />

          <Modal isOpen={modalDelete} toggle={toggleDelete}>
            <ModalHeader toggle={toggleDelete}>
              Delete User Responses?
            </ModalHeader>
            <ModalBody>
              {" "}
              <b>This will delete all user responses in the last month</b>
              <br />
              Are you sure you want to delete responses?
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  handleDelete();
                }}
              >
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={toggleDelete}>
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ViewAnswer;
