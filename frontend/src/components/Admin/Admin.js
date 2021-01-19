import React, { useState, useEffect, useRef } from "react";
import AdminMenu from "./AdminMenu";
import {
  Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

function Admin(props) {
  const history = useHistory();


  return (
  <main className="admin">


    <AdminMenu></AdminMenu>
  </main>
  );
}

export default Admin;
