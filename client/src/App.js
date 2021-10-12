import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
// import { useDispatch } from "react-redux";
import { loadUser } from "./flux/actions/authAction";
import "./App.css";
import { SnackbarProvider } from "notistack";
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
      config.headers["Authorization"] = `Bearer ${token}`;
      // axios
      //   .get("https://api.codechefsrm.in/apis/me", config)
      //   .then((res) => {

      const decoded = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(loadUser({ token: token, user: decoded }));
      // dispatch(loadUser(res.data)) ;
      // })
      // .catch((err) => {
      // console.log(err);
      // dispatch({
      //   type: "AUTH_ERROR",
      // });
      // });
    } else {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  }

  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        maxSnack={3}
      >
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
      </SnackbarProvider>
    </div>
  );
}

export default App;
