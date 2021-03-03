import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const { children, path, loggedIn, ...rest } = props;

  return (
    <Route path={path}>
      {() =>
        loggedIn ? (
          <>{React.cloneElement(children, { ...rest })}</>
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;
