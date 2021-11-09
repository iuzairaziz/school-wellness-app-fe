import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {
  BsFillPeopleFill,
  BsFillPersonFill,
  BsQuestionSquareFill,
} from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { Router, Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <ProSidebar collapsed={props.state}>
      <div class="ham-bt">
        <div
          class={`${
            props.state === false ? "text-dashboard" : "text-dashboard-hide"
          }`}
        >
          Dashboard
        </div>
        <GiHamburgerMenu
          size={20}
          onClick={() => {
            props.setState();
          }}
        />
      </div>
      <Menu iconShape="square">
        <SubMenu title="Admin" icon={<BsFillPersonFill size={20} />}>
          <MenuItem>
            Admin
            <Link to="/admin" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="User" icon={<BsFillPeopleFill size={20} />}>
          <MenuItem>
            User
            <Link to="/user" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Question" icon={<BsQuestionSquareFill size={20} />}>
          <MenuItem>
            Add Questions
            <Link to="/question/add" />
          </MenuItem>
          <MenuItem>
            View Questions
            <Link to="/question" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Answer" icon={<RiQuestionAnswerFill size={20} />}>
          <MenuItem>
            User Response
            <Link to="/answer" />
          </MenuItem>
        </SubMenu>
        <SubMenu title="Email Setting" icon={<AiFillSetting size={20} />}>
          <MenuItem>
            Email Setting
            <Link to="/email-setting" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
