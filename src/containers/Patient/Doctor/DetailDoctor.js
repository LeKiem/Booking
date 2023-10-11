import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {}
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInfoDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data
        });
      }
      console.log("111", res);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    // const { systemMenuPath, isLoggedIn } = this.props;

    console.log("22", this.state);
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData
        .valueVi},${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData
        .valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="info-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${detailDoctor && detailDoctor.image
                  ? detailDoctor.image
                  : ""})`
              }}
            />
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description &&
                  <span>
                    {detailDoctor.Markdown.description}
                  </span>}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">2</div>
          <div className="detail-info-doctor">
            {" "}{detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML &&
              // <div>
              //   {detailDoctor.Markdown.contentHTML}
              // </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML
                }}
              />}
          </div>
          <div className="comment-doctor">4</div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language
    // systemMenuPath: state.app.systemMenuPath
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
