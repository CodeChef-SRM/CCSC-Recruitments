const errorHandler = (err) => {
  let errMessage = "Oops! Something went wrong.";
  if (err) {
    switch (err.response?.status) {
      case 400:
        errMessage = "Kindly check your inputs.";
        break;
      case 403:
        errMessage = "Invalid Credentials.";
        break;
      case 409:
        errMessage = "Already submitted.";
        break;
      case 500:
        errMessage = "Internal server error.";
        break;
      default:
        errMessage = "Oops! Something went wrong.";
        break;
    }
  }
  return errMessage;
};
export default errorHandler;
