import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./ViewAdmin.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddAdmin from "../AddAdmin/AddAdmin";
import adminServices from "../../../services/adminService";

const ViewAdmin = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [data, setDataa] = useState([]);

  const LoggedUser = adminServices.userLoggedInInfo();
  console.log("user", LoggedUser);

  useEffect(() => {
    getUser();
  }, [modalEdit]);

  const getUser = () => {
    adminServices
      .getUsers()
      .then((res) => {
        let dataa = [];
        res.data.map((item, index) => {
          dataa.push({
            id: item._id,
            email: item.email ? item.email : "none",
            lastName: item.lastName ? item.lastName : "none",
            firstName: item.firstName ? item.firstName : "none",
          });
        });
        console.log("data", dataa);
        setDataa(dataa);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-admin">
      {LoggedUser.userRole === "SuperAdmin" ? (
        <div class="row align-items-center mb-3">
          <div class="col-10 mt-5 heading">
            <h3 class="m-0 p-0">Admins</h3>
          </div>
          <div class="col-2 mt-5 add-bt">
            <Button
              type="button"
              class="btn btn-outline-primary btn-lg"
              onClick={() => {
                toggleEdit();
              }}
            >
              Add Admin
            </Button>
          </div>
        </div>
      ) : null}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Last Name</th>
            <th>First Name</th>

            <th>Username</th>
          </tr>
        </thead>
        {data.map((item, index) => {
          return (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>

                <td>{item.email}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Add New Admin</ModalHeader>
        <ModalBody>
          <AddAdmin />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewAdmin;
