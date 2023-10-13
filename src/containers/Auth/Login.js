import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: ""
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
  handleLogin = async () => {
    // console.log(this.state.username);
    // console.log(this.state.password);
    this.setState({
      errMessage: ""
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succeeds");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message
          });
        }
      }
      console.log(error.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    });
  };
  handleKeyDown = event => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
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
                  onKeyDown={event => this.handleKeyDown(event)}
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
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
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

    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: userInfo => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
