import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _, { isEmpty } from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: ""
    };
  }

  componentDidMount() {
    console.log("did mount", this.props.currentUser);
    let user = this.props.currentUser;

    if (user && !isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hasCode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address
      });
    }
  }

  toggle = () => {
    this.props.toggleFormParent();
  };

  handleOnChangeInput = (event, id) => {
    // console.log(event.target.value, id);

    let copState = { ...this.state };
    copState[id] = event.target.value;

    this.setState({
      ...copState
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    console.log(isValid);
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    // console.log("check", this.props);
    // console.log(this.props.isOpen);
    console.log("check props", this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div iv className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={event => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={event => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
                disabled
              />
            </div>
            <div iv className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={event => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div iv className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={event => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div iv className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={event => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
