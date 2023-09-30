import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12  text-login">Login</div>
            <div className="col-12 form-group">
              <label>UserName:</label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="Enter your name"
              />
            </div>
            <div className="col-12 form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control login-input"
                placeholder="Enter your password"
              />
            </div>
            <div className="col-12 ">
              <button className="btn-login">Login</button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your pass</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other">Or Login with: </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google google" />
              <i className="fab fa-facebook-f facebook" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: path => dispatch(push(path)),
    adminLoginSuccess: adminInfo =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
