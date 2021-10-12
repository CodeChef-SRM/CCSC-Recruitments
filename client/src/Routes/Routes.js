import Login from "../component/login/Login";
import Signup from "../component/register/Register";
import Home from "../component/home/Home";
import Form from "../component/form/Form";
import Forgot from "../component/forgot/Forgot";
import Reset from "../component/reset/Reset";

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
    path: "/reset",
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
