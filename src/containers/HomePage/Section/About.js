import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// Import css files

class About extends Component {
  render() {
    return (
      <div className=" section-share section-about">
        <div className="section-about-header">Truyên thông nói về channel</div>
        <div className="section-about-content">
          <div className="content-left">
            {/* <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/j4uW1GXNcwk?list=RDj4uW1GXNcwk"
              title="ĐÔNG PHAI MỜ DÁNG AI REMIX - DATKAA | BÌNH HỒ X FT MẠNH MẤT XÁC - BXH NHẠC HOT TIKTOK ✈️"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}

            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/fecdUEto2kU?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              title="#73 Thêm Hiệu Ứng Chọn/Bỏ Và Xử Lý Dữ Liệu Tạo Lịch Khám Bệnh | Redux-React Cho Người Mới Bắt Đầu"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div className="content-right">
            <p>
              Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo
              trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn
              dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend
              và react để tạo dữ liệu thật cho trang home design này.
            </p>
          </div>
        </div>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
