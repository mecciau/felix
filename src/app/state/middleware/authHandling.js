import auth from "../authentication/index.js";
import history from "history/browser";

const log = ({ dispatch }) => (next) => (action) => {
  console.log("im here", action);
  if (action.type === auth.types.LOGIN_SUCCESS) {
    console.log("here");
    localStorage.setItem("authToken", action.payload.token);
  }

  //   if (action.error === 401) {
  //     return dispatch(auth.actions.logout());
  //   }

  // fake example of logout - need to add to redux auth module action creators and types
  if (action.type === auth.types.LOGOUT_SUCCESS) {
    console.log("here");
    localStorage.removeItem("authToken");
    console.log(history.location);
    history.replace("/");
  }

  return next(action);
};

export default log;
