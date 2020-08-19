import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from './Navbar'
import { isLogin } from "./Util";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <div>
            <Navbar />
            <div className="container">
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
