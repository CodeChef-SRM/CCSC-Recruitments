import React from "react";
// import Login from "../component/login/Login";
// import Signup from "../component/register/Register";
// import Home from "../component/home/Home";
// import Form from "../component/form/Form";
// import Forgot from "../component/forgot/Forgot";
// import Reset from "../component/reset/Reset";

const Home = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 6 * 1000)).then(() =>
    import("../component/home/Home")
  );
});

const Form = React.lazy(() => import("../component/form/Form"));
const Forgot = React.lazy(() => import("../component/forgot/Forgot"));
const Reset = React.lazy(() => import("../component/reset/Reset"));
const Login = React.lazy(() => import("../component/login/Login"));
const Signup = React.lazy(() => import("../component/register/Register"));

const routes = [
  {
    path: "/getting-started",
    component: Form,
    private: true,
  },
  {
    path: "/forgot",
    component: Forgot,
    private: false,
  },
  {
    path: "/reset/:id",
    component: Reset,
    private: false,
  },
  {
    path: "/login",
    component: Login,
    private: false,
  },
  {
    path: "/signup",
    component: Signup,
    private: false,
  },
  {
    path: "/",
    component: Home,
    private: false, //for now
  },
];
export default routes;
