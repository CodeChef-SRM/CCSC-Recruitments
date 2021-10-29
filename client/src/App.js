import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import Preloader from "./component/preloader/Preloader";
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
    if (token) {
      try {
        const decoded = jwt_decode(token);
        localStorage.setItem("token", token);
        dispatch(loadUser({ token: token, user: decoded }));
      } catch (e) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
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
          <Suspense fallback={<Preloader />}>
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
          </Suspense>
        </Router>
      </SnackbarProvider>
    </div>
  );
}
export default App;
