// import React from "react";
// import { connect } from "react-redux";
// import { Redirect, Route, useLocation } from "react-router-dom";

// const PrivateRoute = ({ token, ...props }) => {
//   const location = useLocation();
//   if (token) {
//     return <Route {...props} />;
//   }

//   return (
//     <Redirect to={{ pathname: "/login", state: { referrer: location } }} />
//   );
// };

// const mapStateToProps = ({ authentication: { token } }) => {
//   return {
//     token,
//   };
// };

// export default connect(mapStateToProps)(PrivateRoute);

import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import auth from "../state/authentication";
import authentication from "../state/authentication/index";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const location = useLocation();

  if (isAuthenticated) {
    return <Route {...props} />;
  }

  return (
    <Redirect to={{ pathname: "/login", state: { referrer: location } }} />
  );
};

const enhance = connect((state) => {
  return {
    isAuthenticated: !!authentication.selectors.getAccessToken(state),
  };
});

export default enhance(PrivateRoute);
