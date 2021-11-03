import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import "./InputCreate.scss";

const InputCreate = (props) => {
  console.log("id", props.familyDetails);
  return props.familyDetails.map((val, idx) => {
    let familyDetails = `familyDetails-${idx}`;

    return (
      <div className=" dynamicInput" key={val.index}>
        <div className="row">
          <div className="col-10">
            {/* <label>Family Member Name</label> */}
            <input
              disabled={props.editable ? true : false}
              type="text"
              className="form-control required"
              placeholder="Last Name, First Name"
              name="familyDetails"
              data-id={idx}
              id={familyDetails}
              defaultValue={props.familyDetails[idx].familyDetails}
            />
          </div>
          {/* <div className="d-flex justify-content-end col-2 p-4"> */}
          <div className="col-2">
            {idx === 0 ? (
              props.editable ? (
                ""
              ) : (
                <button
                  onClick={() => props.add()}
                  type="button"
                  className="btn btn-success text-center mb-1"
                >
                  <BsPlusCircle size={25} />
                </button>
              )
            ) : props.editable ? (
              ""
            ) : (
              <button
                className="btn btn-danger mb-1"
                onClick={() => {
                  props.delete(val);
                  console.log(props.editable);
                }}
              >
                <AiOutlineMinusCircle size={25} />
              </button>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  });
};
export default InputCreate;
