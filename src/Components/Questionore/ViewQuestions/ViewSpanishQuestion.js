import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import questionServices from "../../../services/questionService";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import questionSpanishServices from "../../../services/questionSpanishService";

const ViewQuestion = (props) => {
  const [data, setDataa] = useState([]);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = () => {
    questionSpanishServices
      .getQuestions()
      .then((res) => {
        let dataa = [];
        res.data.map((item, index) => {
          dataa.push({
            id: item._id,
            QuestionFour: item.QuestionFour ? item.QuestionFour : "none",
            QuestionThree: item.QuestionThree ? item.QuestionThree : "none",
            QuestionTwo: item.QuestionTwo ? item.QuestionTwo : "none",
            QuestionOne: item.QuestionOne ? item.QuestionOne : "none",
            userName: item.userName ? item.userName : "none",
            createdAt: item.createdAt ? item.createdAt : "none",
          });
        });
        console.log("data", dataa);
        console.log("res data", res.data);
        setDataa(dataa);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="container add-admin">
      <div class="headings">
        <h2>List of Spanish all Questions</h2>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Question 1</th>
            <th>Question 2</th>
            <th>Question 3</th>
            <th>Question 4</th>
            <th>Added By</th>
            <th>Date</th>
          </tr>
        </thead>
        {data.map((item, index) => {
          return (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClass"
                    toolbarStyle={{ display: "none" }}
                    readOnly
                    editorState={EditorState.createWithContent(
                      convertFromRaw(JSON.parse(item.QuestionOne))
                    )}
                  />
                </td>

                <td>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClass"
                    toolbarStyle={{ display: "none" }}
                    readOnly
                    editorState={EditorState.createWithContent(
                      convertFromRaw(JSON.parse(item.QuestionTwo))
                    )}
                  />
                </td>
                <td>
                  {
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClass"
                      toolbarStyle={{ display: "none" }}
                      readOnly
                      editorState={EditorState.createWithContent(
                        convertFromRaw(JSON.parse(item.QuestionThree))
                      )}
                    />
                  }
                </td>
                <td>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClass"
                    toolbarStyle={{ display: "none" }}
                    readOnly
                    editorState={EditorState.createWithContent(
                      convertFromRaw(JSON.parse(item.QuestionFour))
                    )}
                  />
                </td>
                <td>{item.userName}</td>
                <td>{moment(item.createdAt).format("MMM Do YY, h:mm a")}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default ViewQuestion;
