import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import Select from "react-select";
import { getDetailInfoDoctor } from "../../../services/userService";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];
const mdParser = new MarkdownIt /* Markdown-it options */();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false
    };
  }

  componentDidMount() {
    // this.props.fetchUserRedux();
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = inputData => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
        // console.log("3333", object.value);
      });
    }

    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect
      });
      console.log();
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    });
    // console.log("handleEditorChange", html, text);
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    });
  };
  handleChangeSelect = async selectedOption => {
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false
      });
    }
    // console.log("55", res);
  };
  handleOnChangeDesc = event => {
    this.setState({
      description: event.target.value
    });
  };
  render() {
    // console.log("kkkk", this.state);
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thông tin bác sĩ</div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>Chon bac si</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right form-group">
            <label>Thông tin giới thiệu</label>

            <textarea
              className="form-control"
              rows="4"
              onChange={event => this.handleOnChangeDesc(event)}
              value={this.state.description}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={text => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true
            ? <span>Lưu thông tin</span>
            : <span>Tạo mới thông tin</span>}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchAllDoctors: id => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: data => dispatch(actions.saveDetailDoctor(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
