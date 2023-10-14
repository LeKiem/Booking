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
      hasOldData: false,

      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      selectSpecialty: "",
      selectClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: ""
    };
  }

  componentDidMount() {
    this.props.getAllRequiredDoctorInfor();
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
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
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors
        // "USERS"
      );
      this.setState({
        listDoctors: dataSelect
      });
      // console.log("11", dataSelect);
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctors: dataSelect });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPayment);
      let dataSelectPayment = this.buildDataInputSelect(resPrice);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);
      console.log(
        "datata",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince
      });
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
  handleChangeSelect = async (selectedOption) => {
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
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value
    });
  };
  render() {
    // console.log("kkkk", this.state);
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          {" "}
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>

            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            />
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              // value={this.state.selectPrice}
              // onChange={this.handChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              // value={this.state.selectPayment}
              // onChange={this.handChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              // name="selectPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              // value={this.state.selectProvince}
              // onChange={this.handChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              // name="selectProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              // onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              // value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              // onChange={(event) =>
              //   this.handleOnChangeText(event, "addressClinic")
              // }
              // value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              // onChange={(event) => this.handleOnChangeText(event, "note")}
              // value={this.state.note}
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
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
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              {" "}
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
