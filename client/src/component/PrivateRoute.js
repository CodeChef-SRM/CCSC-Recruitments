import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

  const tokenVal = localStorage.getItem("token");
  useEffect(() => {
    if (tokenVal) {
      dispatch({
        type: "SETAUTH",
        payload: {
          status: true,
        },
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
