import React, { useState, useEffect } from "react";
import "./AddAnswer.scss";
import Logo from "../../../images/logo.png";
import answerServices from "../../../services/answerServices";
import currentQuestionServices from "../../../services/currentQuestion";
import shortValidations from "../../../validations/shortValidations";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import currentSpanishQuestionServices from "../../../services/currentSpanishQuestion";
import answerSpanishServices from "../../../services/answerSpanishService";
import MaskInput from "react-maskinput";

const AddSpanishAnswer = (props) => {
  const [data, setDataa] = useState([]);
  const history = useHistory();
  let userId = props.match.params.userId;
  let userName = props.match.params.userName;
  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = () => {
    currentSpanishQuestionServices
      .getCurrentQuestions()
      .then((res) => {
        let dataa = [];
        res.data.map((item, index) => {
          dataa.push({
            id: item._id,
            QuestionOne: item.QuestionOne ? item.QuestionOne : "none",
            QuestionTwo: item.QuestionTwo ? item.QuestionTwo : "none",
            QuestionThree: item.QuestionThree ? item.QuestionThree : "none",
            QuestionFour: item.QuestionFour ? item.QuestionFour : "none",
            userName: item.userName ? item.userName : "none",
          });
        });
        setDataa(dataa);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{
        AnswerOne: "",
        AnswerTwo: "",
        AnswerThree: "",
        AnswerFour: "",
        // Name: "",
        LastName: "",
        FirstName: "",
        Phone: "",
        PersonComp: "",
        Purpose: "",
        Grade: "",
      }}
      validationSchema={shortValidations.newAnswerValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);

        answerSpanishServices
          .addAnswers(
            data[0].QuestionOne,
            data[0].QuestionTwo,
            data[0].QuestionThree,
            data[0].QuestionFour,
            values.AnswerOne,
            values.AnswerTwo,
            values.AnswerThree,
            values.AnswerFour,
            values.LastName,
            values.Grade,
            // values.Name,
            values.Phone,
            values.PersonComp,
            values.Purpose,
            props.match.params.userId,
            props.match.params.userName.match,
            userName,
            values.FirstName
          )
          .then((res) => {
            history.push("/greeting");
            answerSpanishServices.handleCustomMessage("Added Successfully");
          });
      }}
    >
      {(props) => {
        return (
          <div class="conatiner add-ans">
            <div class="heading">
              <img src={Logo} height="200" width="200" alt="logo" />
            </div>
            <div className="row bt-set">
              <div className="col-11 bt-sett">
                <div class="btn-group">
                  <a
                    href={`/answer/add/${userId}/${userName}`}
                    class="btn btn-primary btc"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    class="btn btn-primary active"
                    aria-current="page"
                  >
                    Spanish
                  </a>
                </div>
              </div>
            </div>
            <div class="cardd ml-10 q-form">
              <h5>CUESTIONARIO DE PRUEBA ACTIVA COVID-19</h5>
              <h6 className="mb-4">
                Su salud y bienestar son de suma importancia y estamos tomando
                medidas para mantener nuestra ubicación como un entorno seguro
                para todos los que ingresan. Por lo tanto, cualquier persona que
                ingrese a este lugar será examinada para tomar su temperatura y
                hacer las siguientes preguntas de bienestar.
              </h6>
              {data.map((item, index) => {
                return (
                  <div class="questionsss">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label col-12">
                        <h5>Pregunta 1:</h5>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClass"
                          toolbarStyle={{ display: "none" }}
                          readOnly
                          editorStyle={
                            {
                              // minHeight: auto,
                            }
                          }
                          editorState={EditorState.createWithContent(
                            convertFromRaw(JSON.parse(item.QuestionOne))
                          )}
                        />
                      </label>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerOne"
                          id="AnswerOne"
                          value="Yes"
                          onChange={props.handleChange("AnswerOne")}
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          SI
                        </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerOne"
                          id="AnswerOne"
                          value="No"
                          onChange={props.handleChange("AnswerOne")}
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          NO
                        </label>
                      </div>
                      <span id="err" className="invalid-feedback">
                        {props.touched.AnswerOne && props.errors.AnswerOne}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label col-12">
                        <h5>Pregunta 2:</h5>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClass"
                          toolbarStyle={{ display: "none" }}
                          readOnly
                          editorStyle={
                            {
                              // minHeight: "300px",
                            }
                          }
                          editorState={EditorState.createWithContent(
                            convertFromRaw(JSON.parse(item.QuestionTwo))
                          )}
                        />
                        {/* {item.QuestionTwo} */}
                      </label>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerTwo"
                          id="AnswerTwo"
                          value="Yes"
                          onChange={props.handleChange("AnswerTwo")}
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          SI
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerTwo"
                          id="AnswerTwo"
                          value="No"
                          onChange={props.handleChange("AnswerTwo")}
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          NO
                        </label>
                      </div>
                      <span id="err" className="invalid-feedback">
                        {props.touched.AnswerTwo && props.errors.AnswerTwo}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label col-12">
                        <h5>Pregunta 3:</h5>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClass"
                          toolbarStyle={{ display: "none" }}
                          readOnly
                          editorStyle={
                            {
                              // minHeight: "300px",
                            }
                          }
                          editorState={EditorState.createWithContent(
                            convertFromRaw(JSON.parse(item.QuestionThree))
                          )}
                        />
                        {/* {item.QuestionThree} */}
                      </label>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerThree"
                          id="AnswerThree"
                          value="Yes"
                          onChange={props.handleChange("AnswerThree")}
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          SI
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerThree"
                          id="AnswerThree"
                          value="No"
                          onChange={props.handleChange("AnswerThree")}
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          NO
                        </label>
                      </div>
                      <span id="err" className="invalid-feedback">
                        {props.touched.AnswerThree && props.errors.AnswerThree}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label col-12">
                        <h5>Pregunta 4:</h5>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClass"
                          toolbarStyle={{ display: "none" }}
                          readOnly
                          editorStyle={
                            {
                              // minHeight: "300px",
                            }
                          }
                          editorState={EditorState.createWithContent(
                            convertFromRaw(JSON.parse(item.QuestionFour))
                          )}
                        />
                        {/* {item.QuestionFour}  */}
                      </label>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerFour"
                          id="AnswerFour"
                          value="Yes"
                          onChange={props.handleChange("AnswerFour")}
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          SI
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="AnswerFour"
                          id="AnswerFour"
                          value="No"
                          onChange={props.handleChange("AnswerFour")}
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          NO
                        </label>
                      </div>
                      <span id="err" className="invalid-feedback">
                        {props.touched.AnswerFour && props.errors.AnswerFour}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Apellido
                      </label>
                      <input
                        disabled
                        type="text"
                        onBlur={props.handleBlur}
                        name="LastName"
                        className="form-control"
                        id="staticLastName"
                        placeholder="Last Name"
                        onChange={props.handleChange("LastName")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.LastName && props.errors.LastName}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Vorname
                      </label>
                      <input
                        disabled
                        type="text"
                        onBlur={props.handleBlur}
                        name="FirstName"
                        className="form-control"
                        id="staticFirstName"
                        placeholder="First Name"
                        onChange={props.handleChange("FirstName")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.FirstName && props.errors.FirstName}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Calificación
                      </label>
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="Grade"
                        className="form-control"
                        id="staticGrade"
                        placeholder="Ingrese su grado"
                        value={props.values.Grade}
                        onChange={props.handleChange("Grade")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.Grade && props.errors.Grade}
                      </span>
                    </div>
                    {/* <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Primer Nombre
                      </label>
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="Name"
                        className="form-control"
                        id="staticName"
                        placeholder="Ingrese su nombre"
                        value={props.values.Name}
                        onChange={props.handleChange("Name")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.Name && props.errors.Name}
                      </span>
                    </div> */}

                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Teléfono
                      </label>
                      <div className="row">
                        <MaskInput
                          alwaysShowMask
                          mask={"+1 (000) 000 - 0000"}
                          size={20}
                          showMask
                          maskChar="_"
                          placeholder="Por favor ingrese su Teléfono"
                          type="text"
                          className="form-control numInput"
                          value={props.values.Phone}
                          onChange={props.handleChange("Phone")}
                        />
                      </div>
                      {/* <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="Phone"
                        className="form-control"
                        id="staticPhone"
                        placeholder="Por favor ingrese su Teléfono"
                        value={props.values.Phone}
                        onChange={props.handleChange("Phone")}
                      /> */}
                      <span id="err" className="invalid-feedback">
                        {props.touched.Phone && props.errors.Phone}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Persona que llena el formulario (Apellido, Nombre)
                      </label>
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="PersonComp"
                        className="form-control"
                        id="staticPersonComp"
                        placeholder="Ingrese el nombre de la persona que completó la evaluación"
                        value={props.values.PersonComp}
                        onChange={props.handleChange("PersonComp")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.PersonComp && props.errors.PersonComp}
                      </span>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Razón de visita?
                      </label>
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="Purpose"
                        className="form-control"
                        id="staticPurpose"
                        placeholder="Por favor escribe Razón de visita"
                        value={props.values.Purpose}
                        onChange={props.handleChange("Purpose")}
                      />
                      <span id="err" className="invalid-feedback">
                        {props.touched.Purpose && props.errors.Purpose}
                      </span>
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        props.handleSubmit();
                        console.log("errors", props.errors);
                      }}
                      class="btn btn-primary btn-lg"
                    >
                      Submit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddSpanishAnswer;
