import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import answerService from "../../../services/answerServices";
import moment from "moment";
import answerSpanishService from "../../../services/answerSpanishService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ViewAnswer.scss";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { CSVLink } from "react-csv";

const ViewSpanishAnswer = (props) => {
  const [applyfilter, setApplyFilter] = useState("");
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
        label: "Date",
        field: "createdAt",
        sort: "asc",
        // width: 100,
      },
      {
        label: "Time",
        field: "Time",
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
      {
        label: "User",
        field: "user",
        sort: "asc",
        // width: 100,
      },
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
    ],
    rows: [],
  });
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    getAllQuestions(applyfilter);
  }, [modalDelete, applyfilter]);

  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleDelete = () => {
    answerSpanishService
      .deleteAnswers()
      .then((res) => {
        if (res.data.deletedCount === 0) {
          return answerSpanishService.handleMessage("noData");
        } else {
          answerSpanishService.handleMessage("delete");
          toggleDelete();
        }
      })
      .catch((err) => {
        answerSpanishService.handleError();
        toggleDelete();
      });
  };

  const getAllQuestions = (month) => {
    answerSpanishService
      .getAnswers(month)
      .then((res) => {
        let data = { ...dataa };
        let csvdata = [];
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            createdAt: item.createdAt
              ? moment(item.createdAt).format("LL")
              : "none",
            Time: item.createdAt
              ? moment(item.createdAt).format("h:mm")
              : "none",
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
            user: item.user ? item.user.email : "none",
            Grade: item.Grade ? item.Grade : "none",
            // QuestionFour: item.questionSpanish.QuestionFour
            //   ? item.questionSpanish.QuestionFour && (
            //       <Editor
            //         toolbarClassName="toolbarClassName"
            //         wrapperClassName="wrapperClassName"
            //         editorClassName="editorClass"
            //         toolbarStyle={{ display: "none" }}
            //         readOnly
            //         editorState={EditorState.createWithContent(
            //           convertFromRaw(
            //             JSON.parse(item.questionSpanish.QuestionFour)
            //           )
            //         )}
            //       />
            //     )
            //   : "none",
          });

          csvdata.push({
            Date: item.createdAt ? moment(item.createdAt).format("LL") : "none",
            Time: item.createdAt
              ? moment(item.createdAt).format("h:mm")
              : "none",
            Name: item.LastName ? item.LastName : "none",
            Grade: item.Grade ? item.Grade : "none",
            Contact: item.Phone ? item.Phone : "none",
            PersonCompleting: item.PersonComp ? item.PersonComp : "none",
            Reason: item.Purpose ? item.Purpose : "none",
            User: item.user ? item.user.email : "none",
            AnswerOne: item.AnswerOne ? item.AnswerOne : "none",
            AnswerTwo: item.AnswerTwo ? item.AnswerTwo : "none",
            AnswerThree: item.AnswerThree ? item.AnswerThree : "none",
            AnswerFour: item.AnswerFour ? item.AnswerFour : "none",
          });
        });
        setData(data);
        setCsvData(csvdata);
        console.log("data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-answer mt-3">
      <div className="card m-b-20">
        <div className="card-body">
          <div class="headings row">
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
                <CSVLink data={csvData} filename="AnswersSpanish.csv">
                  Export
                </CSVLink>
              </button>
            </div>
            <div className="col-10">
              <h2>List of all Spanish Answers</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ViewSpanishAnswer;
