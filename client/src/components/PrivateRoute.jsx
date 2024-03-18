import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn ? (
          <Component auth={auth} {...props} {...rest}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { message: 'Please login or sign up first.'}
            }}
          />
        )
      }
    />
  );

export default PrivateRoute;
