import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
// import { useDispatch } from "react-redux";
import { loadUser } from "./flux/actions/authAction";
import "./App.css";
import Routes from "./Routes/Routes";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  function onLoad() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = token;

      // get user through token if no token then through a error
      axios
        .get("https://api.codechefsrm.in/apis/me", config)
        .then((res) => {
          const decoded = jwt_decode(token);
          dispatch(loadUser({ token: token, user: decoded }));
          // dispatch(loadUser(res.data)) ;
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: "AUTH_ERROR",
          });
        });
    } else {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  }

  return (
    <div>
      <Router>
        <div className="App">
          {Routes.map((route) =>
            route.private === true ? (
              <PrivateRoute
                path={route.path}
                exact
                component={route.component}
              />
            ) : (
              <Route path={route.path} exact component={route.component} />
            )
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
