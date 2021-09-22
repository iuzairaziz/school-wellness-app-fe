import React from "react";
import InputCreate from "./InputCreate";
import "./InputList.scss";

class InputList extends React.Component {
  handleChange = (e) => {
    if (["familyDetails"].includes(e.target.name)) {
      let familyDetails = [...this.props.familyDetails];
      familyDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.props.setFamilyDetails((prevState) => [
        ...prevState,
        { [e.target.name]: e.target.value },
      ]);
    }
  };
  addNewRow = (e) => {
    this.props.setFamilyDetails((prevState) => [
      ...prevState,
      {
        index: Math.random(),
        familyDetails: "",
      },
    ]);
  };

  deteteRow = (index) => {
    this.props.setFamilyDetails(
      this.props.familyDetails.filter((s, sindex) => index !== sindex)
    );
  };

  clickOnDelete(record) {
    this.props.setFamilyDetails((prevState) =>
      this.props.familyDetails.filter((r) => r !== record)
    );
  }

  render() {
    let { familyDetails } = this.props;
    return (
      <div className="content">
        {/* {console.log("Project Phases",this.props.projectPhase)} */}
        {console.log("familyDetails", familyDetails)}
        <form onSubmit={(e) => e.preventDefault()} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 10 }}>
            <div className="col-sm-1" />
            <div className="col-10">
              {/* <h4 className="text-center"> Enter Name</h4> */}
              <div style={{ marginTop: 10 }}>
                <InputCreate
                  add={this.addNewRow}
                  delete={this.clickOnDelete.bind(this)}
                  familyDetails={familyDetails}
                />
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
      </div>
    );
  }
}
export default InputList;
