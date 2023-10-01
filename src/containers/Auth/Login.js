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
    this.state = {
      username: "",
      password: "",
      isShowPassword: false
    };
  }

  handleOnChangeUserName = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleOnChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleLogin = () => {
    console.log(this.state.username);
    console.log(this.state.password);
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    });
  };
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
                value={this.state.username}
                onChange={event => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group  login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={event => {
                    this.handleOnChangePassword(event);
                  }}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  />
                </span>
              </div>
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
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
