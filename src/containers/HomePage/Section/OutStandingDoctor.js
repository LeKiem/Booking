import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 2</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 3</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 4</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 5</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Co Xuong khop 6</div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
