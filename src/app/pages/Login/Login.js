import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import authentication from "../../state/authentication/index.js";

import "./Login.scss";
import Button from "../../components/Button/Button";
import eye from "../../images/eye.svg";

const Login = ({ login, loading, error, isAuthenticated, token }) => {
  let emailInput = React.createRef();
  let passwordInput = React.createRef();

  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   // if (localStorage.authorization) {
  //   //   history.replace("/content");
  //   // }
  //   emailInput.focus();
  // }, [emailInput]);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(
        location.state ? location.state.referrer.pathname : "/content"
      );
    } else {
      emailInput.focus();
    }
  }, [emailInput, history, location, isAuthenticated, token]);

  const signIn = () => {
    login(emailInput.value, passwordInput.value);
  };

  // const signIn = async () => {
  //   const response = await fetch(
  //     "https://academy-video-api.herokuapp.com/auth/login",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: emailInput.value,
  //         password: passwordInput.value,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     const { message } = await response.json();
  //     return setError(message);
  //   }
  //   const { token } = await response.json();
  //   localStorage.setItem("authorization", token);
  //   login(token);
  //   return history.replace(
  //     location.state ? location.state.referrer.pathname : "/content"
  //   );
  // };
  const revealPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <section className="hero has-background-black-ter is-fullheight-with-navbar login-section">
      <div className="hero-body">
        <div className="container">
          <div className="tile login-tile">
            <div className="tile has-background-grey-light is-6 is-vertical ">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    ref={(input) => {
                      emailInput = input;
                    }}
                  />
                </div>
              </div>
              <div className="field password-field">
                <label className="label">Password</label>
                <div className="control has-icons-right">
                  <span
                    className="icon is-small is-right icon-eye"
                    onMouseDown={revealPassword}
                    onMouseUp={revealPassword}
                  >
                    <img src={eye} alt="eye icon" />
                  </span>
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    ref={(input) => {
                      passwordInput = input;
                    }}
                  />
                </div>
              </div>
              {error && <p className="is-size-6 has-text-danger">{error}</p>}

              <div className="field">
                <div className="control has-text-centered">
                  <Button onClick={signIn}>Sign In</Button>
                </div>
              </div>

              <p className="is-size-6">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const enhance = connect(
  (state) => {
    return {
      error: authentication.selectors.getLoginErrorMessage(state),
      loading: authentication.selectors.isFetchingLogin(state),
      isAuthenticated: !!authentication.selectors.getAccessToken(state),
      token: authentication.selectors.getAccessToken(state),
    };
  },
  (dispatch) => {
    return {
      login: bindActionCreators(authentication.actions.login, dispatch),
    };
  }
);

export default enhance(Login);

// const mapStateToProps = (state) => {
//   return state;
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (token) => dispatch({ type: content.types.USER_LOGIN, token }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
