import React, { useState } from "react";
import { Formik } from "formik";
import questionService from "../../../services/questionService";
import "../AddQuestion/AddQuestion.scss";
import currentQuestionServices from "../../../services/currentQuestion";
import adminService from "../../../services/adminService";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

const AddQuestion = (props) => {
  let sideBarState = props.state;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let userEmail = adminService.userLoggedInInfo().email;

  return (
    <Formik
      initialValues={{
        QuestionOne: EditorState.createEmpty(),
        QuestionTwo: EditorState.createEmpty(),
        QuestionThree: EditorState.createEmpty(),
        QuestionFour: EditorState.createEmpty(),
      }}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        currentQuestionServices
          .addCurrentQuestions({
            QuestionOne: JSON.stringify(
              convertToRaw(values.QuestionOne.getCurrentContent())
            ),
            QuestionTwo: JSON.stringify(
              convertToRaw(values.QuestionTwo.getCurrentContent())
            ),
            QuestionThree: JSON.stringify(
              convertToRaw(values.QuestionThree.getCurrentContent())
            ),
            QuestionFour: JSON.stringify(
              convertToRaw(values.QuestionFour.getCurrentContent())
            ),
            userName: userEmail,
          })
          .then((res) => {
            currentQuestionServices.handleCustomMessage("Added Successfully");
            // this.props.history.push("/");
            // window.location.reload();
          });
      }}
    >
      {(props) => {
        return (
          <div class="container add-question">
            <div class="row mb-3">
              <div class="col-12 mt-5 heading">
                <h1 class="ml-10 p-0">Add Questions</h1>
              </div>
            </div>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fSize">
                  Question 1
                </label>
                <div className="col-12">
                  <Editor
                    name="QuestionOne"
                    onBlur={props.handleBlur}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="borderr"
                    editorClassName="editor"
                    editorState={props.values.QuestionOne}
                    onEditorStateChange={(val) => {
                      props.setFieldValue("QuestionOne", val);
                    }}
                  />
                </div>
                <span id="err" className="invalid-feedback">
                  {props.touched.QuestionOne && props.errors.QuestionOne}
                </span>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fSize">
                  Question 2
                </label>
                <Editor
                  name="QuestionTwo"
                  onBlur={props.handleBlur}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="borderr"
                  editorClassName="editor"
                  editorState={props.values.QuestionTwo}
                  onEditorStateChange={(val) => {
                    props.setFieldValue("QuestionTwo", val);
                  }}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.QuestionTwo && props.errors.QuestionTwo}
                </span>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fSize">
                  Question 3
                </label>
                <Editor
                  name="QuestionThree"
                  onBlur={props.handleBlur}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="borderr"
                  editorClassName="editor"
                  editorState={props.values.QuestionThree}
                  onEditorStateChange={(val) => {
                    props.setFieldValue("QuestionThree", val);
                  }}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.QuestionThree && props.errors.QuestionThree}
                </span>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fSize">
                  Question 4
                </label>
                <Editor
                  name="QuestionFour"
                  onBlur={props.handleBlur}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="borderr"
                  editorClassName="editor"
                  editorState={props.values.QuestionFour}
                  onEditorStateChange={(val) => {
                    props.setFieldValue("QuestionFour", val);
                  }}
                />
                <span id="err" className="invalid-feedback">
                  {props.touched.QuestionFour && props.errors.QuestionFour}
                </span>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                onClick={props.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddQuestion;
