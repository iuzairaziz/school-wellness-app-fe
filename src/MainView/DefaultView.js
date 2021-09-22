import React, { Component, Suspense, useState } from "react";
import {
  Switch,
  Route,
  withRouter,
  withProps,
  Redirect,
} from "react-router-dom";
import SideBar from "../Components/Sidebar/Sidebar";
import adminService from "../services/adminService";
import AppRoutes from "../Routes/AppRoutes";
import Header from "../Components/Header/Header";

const DefaultView = (props) => {
  const [sidebar, setSideBar] = useState(true);
  console.log("Default View", props.match.params);
  return (
    <>
      {adminService.isLoggedIn() ? (
        <>
          <Header />
          <SideBar state={sidebar} setState={() => setSideBar(!sidebar)} />
        </>
      ) : (
        ""
      )}
      <Switch>
        {AppRoutes.map((route, i) => {
          return (
            adminService.isLoggedIn() &&
            route.name === "private" && (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                render={(props) => (
                  <route.component state={sidebar} {...props} />
                )}
              />
            )
          );
        })}
        {AppRoutes.map((route, i) => {
          return (
            route.name === "public" && (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                render={(props) => (
                  <route.component state={sidebar} {...props} />
                )}
              />
            )
          );
        })}
        {AppRoutes.map((route, i) => {
          return (
            adminService.isLoggedIn() &&
            adminService.userLoggedInInfo().userRole === "SuperAdmin" &&
            route.name === "Admin" && (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                render={(props) => (
                  <route.component state={sidebar} {...props} />
                )}
              />
            )
          );
        })}
        {!adminService.isLoggedIn() ? <Redirect to="/login" /> : null}
      </Switch>
    </>
  );
};

export default withRouter(DefaultView);
