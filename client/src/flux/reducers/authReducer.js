const initialData = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: null,
  // phaseOne:null,
  // phaseOneStatus:null,
  // phaseTwo:null,
  // phaseTwoStatus:null,
};

const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "REGISTER":
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case "SETAUTH":
      return {
        ...state,
        isAuthenticated: action.payload.status,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
