import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import chuyenKhoa from "../../assets//images/icon/kham-chuyen-khoa.png";
import tuXa from "../../assets//images/icon/iconkham-tu-xa.png";
import tongQuat from "../../assets//images/icon/kham-tong-quan.png";
import yHoc from "../../assets//images/icon/xet-nghiem-y-hoc.png";
import tinhThan from "../../assets//images/icon/suc-khoe-tinh-than.png";
import nhaKhoa from "../../assets//images/icon/kham-nha-khoa.png";
import { withRouter } from "react-router";

import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changeLanguage = language => {
    // alert(language);
    this.props.changeLanguageAppRedux(language);
  };
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars" />
              <img
                className="header-logo"
                src={logo}
                onClick={() => this.returnHome()}
              />
              {/* <div className="header-logo">
                <h1 />
              </div> */}
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  {" "}<FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  {" "}<FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}<FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  {" "}<FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <h2 />
              <div className="support">
                <i className="fas fa-question" />{" "}
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>{" "}
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search" />
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-hospital" /> */}
                    <img src={chuyenKhoa} />
                  </div>
                  <div className="text-child">
                    {" "}<FormattedMessage id="banner.Specialist" />{" "}
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-mobile-alt" /> */}
                    <img src={tuXa} />
                  </div>
                  <div className="text-child">
                    {" "}<FormattedMessage id="banner.far" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-procedures" /> */}
                    <img src={tongQuat} />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.generality" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-flask" /> */}
                    <img src={yHoc} />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.test" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-user-md" /> */}
                    <img src={tinhThan} />
                  </div>
                  <div className="text-child">
                    {" "}<FormattedMessage id="banner.morale" />{" "}
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {/* <i className="fas fa-briefcase-medical" /> */}
                    <img src={nhaKhoa} />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.dentistry" />
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageAppRedux: language => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
