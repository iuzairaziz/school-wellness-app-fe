import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./ViewUser.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddUser from "../AddUser/AddUser";
import userServices from "../../../services/userService";
import { CSVLink } from "react-csv";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import moment from "moment";

const ViewUser = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [familyData, setFamilyData] = useState();
  const [csvData, setCsvData] = useState("");
  const [dataa, setData] = useState({
    columns: [
      {
        label: "#",
        field: "title",
        sort: "asc",
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
      },
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
      },
      {
        label: "Username",
        field: "email",
        // sort: "asc",
      },
      {
        label: "Family Members",
        field: "familyMembers",
        // sort: "asc",
      },
      {
        label: "Consent",
        field: "recieveEmail",
        sort: "asc",
      },
    ],
    rows: [],
  });

  console.log("fam data", familyData);
  useEffect(() => {
    getAdmin();
  }, [modalEdit]);

  const getAdmin = () => {
    userServices
      .getUsers()
      .then((res) => {
        let csvdata = [];
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            title: index + 1,
            email: item.email ? item.email : "none",
            lastName: item.lastName ? item.lastName : "none",
            firstName: item.firstName ? item.firstName : "none",
            recieveEmail: item.recieveEmail ? item.recieveEmail : "none",
            familyMembers: item.familyMembers
              ? item.familyMembers.map((item, index) => {
                  return (
                    <div>
                      {item.familyDetails}
                      <br />
                    </div>
                  );
                })
              : "none",
          });
          if (item.recieveEmail === "Yes") {
            csvdata.push({
              // id: item._id,
              LastName: item.lastName ? item.lastName : "none",
              FirstName: item.firstName ? item.firstName : "none",
              Email: item.email ? item.email : "none",
              FamilyMembers: item.familyMembers
                ? item.familyMembers.map((item, index) => {
                    return item.familyDetails;
                  })
                : "none",
              Consent: item.recieveEmail ? item.recieveEmail : "none",
            });
          }
        });
        console.log("data", data);
        console.log("csvdat", csvdata);
        setData(data);
        setCsvData(csvdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-user mt-3">
      <div className="card m-b-20">
        <div className="card-body">
          <div class="headings">
            <div className="col-1">
              <button type="button" class="btn btn-success btn-lg">
                <CSVLink data={csvData} filename="Users.csv">
                  Export
                </CSVLink>
              </button>
            </div>
            <div className="col-9">
              <h2>All Users</h2>
            </div>
            <div className="col-2">
              <Button
                type="button"
                class="btn btn-success btn-lg"
                onClick={() => {
                  toggleEdit();
                }}
              >
                Add User
              </Button>
            </div>
          </div>
          <MDBDataTableV5
            responsive
            striped
            // small
            onPageChange={(val) => console.log(val)}
            bordered={true}
            materialSearch
            searchTop
            searchBottom={false}
            // pagingTop
            // barReverse
            hover
            // scrollX
            // autoWidth
            data={dataa}
            theadColor="#000"
          />
        </div>
      </div>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Add New User</ModalHeader>
        <ModalBody>
          <AddUser />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewUser;
