import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const { children, path, ...rest } = props;

  React.useEffect(() => {
    if (!props.loggedIn) {
      props.setLoginClick(true);
    }
  }, [props]);

  return (
    <Route path={path}>
      {() =>
        props.loggedIn ? (
          <>{React.cloneElement(children, { ...rest })}</>
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;
