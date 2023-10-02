import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService
} from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false
    };
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
    });
  };
  async componentDidMount() {
    await this.getAllUsersForm();
  }
  getAllUsersForm = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users
      });
    }
  };
  createNewUser = async data => {
    // alert("call me");
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersForm();
        this.setState({
          isOpenModalUser: false
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "my" });
      }
      // console.log("user", response);
    } catch (e) {
      console.log(e);
    }
    // console.log(data);
  };

  handleDeleteUser = async user => {
    // alert("click");
    // console.log("user: ", user);
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersForm();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    console.log("Check render 1", this.state.arrUsers);
    let arrUsers = this.state.arrUsers;
    // console.log("user test", arrUsers);
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFormParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">Manage users booking</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus" /> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  console.log("check map", item, index);
                  return (
                    <tr>
                      <td>
                        {item.email}
                      </td>
                      <td>
                        {item.firstName}
                      </td>
                      <td>
                        {item.lastName}
                      </td>
                      <td>
                        {item.address}
                      </td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
