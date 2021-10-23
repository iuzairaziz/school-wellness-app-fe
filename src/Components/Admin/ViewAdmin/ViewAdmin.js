import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./ViewAdmin.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddAdmin from "../AddAdmin/AddAdmin";
import adminServices from "../../../services/adminService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const ViewAdmin = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleOpen = () => setModalOpen(!modalOpen);

  // const [data, setDataa] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({ name: "" });

  const LoggedUser = adminServices.userLoggedInInfo();
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
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });

  const handleDelete = (id) => {
    adminServices
      .deleteUsers(id)
      .then((res) => {
        adminServices.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        adminServices.handleError();
        toggleDelete();
      });
  };

  useEffect(() => {
    getUser();
  }, [modalEdit, modalDelete, modalOpen]);

  const getUser = () => {
    adminServices
      .getUsers()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            title: index + 1,
            email: item.email ? item.email : "none",
            lastName: item.lastName ? item.lastName : "none",
            firstName: item.firstName ? item.firstName : "none",
            action: (
              <div className="row">
                {LoggedUser.userRole === "SuperAdmin" ? (
                  <div>
                    <MdDelete
                      className="mdi mdi-delete-forever iconsS my-danger-icon"
                      size={20}
                      onClick={() => {
                        setSelectedAdmin(item);
                        toggleDelete();
                      }}
                    />

                    <FaEdit
                      className="mdi mdi-delete-forever iconsS my-danger-icon"
                      size={20}
                      onClick={() => {
                        setSelectedAdmin(item);
                        toggleEdit();
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ),
          });
        });
        // console.log("data", dataa);
        setData(data);
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
                toggleOpen();
              }}
            >
              Add Admin
            </Button>
          </div>
        </div>
      ) : null}
      <div className="mt-4">
      <MDBDataTableV5
        responsive
        striped
        onPageChange={(val) => console.log(val)}
        bordered={true}
        materialSearch
        searchTop
        searchBottom={false}
        hover
        data={dataa}
        theadColor="#000"
      />
          </div>
          <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Edit Admin</ModalHeader>
        <ModalBody>
          <AddAdmin editable={true} admin={selectedAdmin} toggleEdit={toggleEdit}  toggle={toggleEdit} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>Add New Admin</ModalHeader>
        <ModalBody>
          <AddAdmin toggleOpen={toggleOpen}/>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>Delete Admin?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the Admin "{selectedAdmin.firstName}"?
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(selectedAdmin._id);
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
  );
};

export default ViewAdmin;
