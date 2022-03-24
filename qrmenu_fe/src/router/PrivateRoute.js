import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";

import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? children : <div>Please Login</div>
      }
    />
  );
}

export default PrivateRoute;
