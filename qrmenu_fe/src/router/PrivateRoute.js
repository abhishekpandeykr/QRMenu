import { Navigate } from "react-router-dom";
import React, { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children, redirectTo = "/login", ...rest }) {
  const auth = useContext(AuthContext);
  console.log("all the props of router is", rest, children);

  if (!auth.token) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

export default PrivateRoute;
