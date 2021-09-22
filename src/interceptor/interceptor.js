import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import $ from "jquery";
import AdminService from "../services/adminService";

const httpIntercept = () => {
  axios.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      this.props.history.push("/login");
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // console.log("interceptor", response);
      return response;
    },
    (error) => {
      this.props.history.push("/login");

      throw error;
    }
  );
};

export default httpIntercept;
