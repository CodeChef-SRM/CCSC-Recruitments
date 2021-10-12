import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import jwt_decode from "jwt-decode";
// import axios from "axios";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  // const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  // const [auth, setAuth] = useState(null);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const tokenVal = localStorage.getItem("token");
  //   const body = JSON.stringify(tokenVal);
  //   // Headers
  //   if (tokenVal) {
  //     console.log(tokenVal);
  //     setAuth(true);
  //   } else {
  //     // const config = {
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // };
  //     // axios
  //     //   .post("https://api.codechefsrm.in/apis/verify", body, config)
  //     //   .then((res) => {
  //     //     setAuth(true);
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log(err);
  //     //     // dispatch({
  //     //     //   type: "REGISTER_FAIL",
  //     //     // });
  //     //     setAuth(false);
  //     //   });
  //     setAuth(false);
  //   }
  // }, []);
  // // eslint-disable-next-line
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authenticated && token ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
