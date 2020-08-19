import React, { PureComponent } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { logout } from "../Actions/index";
import { logoutUtil } from "./Util";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {updatePassword } from '../Services/services'
import Loader from "./Loader";

class PatientProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      patientProfile: {},
      isUpdatePassword: false,
      oldPassword: "",
      newPassword: "",
      errors: {},
      isLoader : false,
    };
  }

  componentDidMount() {
    if (this.props.state.userRole !== "Guest") {
      this.props.history.push("/dashboard");
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleResetForm = (e) => {
    this.setState({ errors: {} , newPassword : ''});
    this.setState({
      isUpdatePassword: true,
    });
  };

  handleCancelReset = (e) => {
    this.setState({
      isUpdatePassword: false,
    });
  };

  valid() {
    const errors = {};
    let count = 0;

    if (this.state.newPassword !== "") {
      if (
        !this.state.newPassword.match(
          /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        )
      ) {
        errors.passwordError =
          "Password Should Contains 1 Uppercase, 1 Lowercase, Minimum 8 Characters ";
        count = count + 1;
      }
    } else {
      errors.passwordError = "Password Cannot be Empty!!";
      count = count + 1;
    }

    return { errors, count };
  }

  handleUpdatePassword = (e) => {
    e.preventDefault();
    const id = this.props.patientID._id;
    this.setState({ errors: {} });
    const returnData = this.valid();
    const errors = returnData.errors;
    this.setState({ errors });
    if (returnData.count < 1) {
      this.setState({isLoader : true})
      updatePassword(id, this.state.newPassword).then((res) => {
        console.log(res)
        if (res.success) {
          toastr.success(res.success);
          this.setState({
            isUpdatePassword: false,
            isLoader : false
          });
        }
      });
    }
  };

  handleLogout = (e) => {
    logoutUtil();
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const data = this.props.patientID;

    return (
      <div className="">
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <Loader />
            </div>
          </div>
        ) : null}
        <div className="patientProfile--Section">
          <div className="disp-flex">
            <p className="profileHeader">Hello, {data.fullName}</p>
            <div className="resetPasswordBtn">
              {this.state.isUpdatePassword ? (
                <button
                  className="btn waves-effect waves-light"
                  onClick={this.handleCancelReset}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light"
                  onClick={this.handleResetForm}
                >
                  Reset Password
                </button>
              )}

              <button
                className="btn waves-effect waves-light logoutBtn"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {this.state.isUpdatePassword ? (
            <div className="password-reset">
              <form onSubmit={this.handleUpdatePassword}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_lock</i>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="autocomplete"
                      value={this.state.newPassword}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label htmlFor="newPassword">New Password</label>
                    <span className="fieldError">
                      {this.state.errors.passwordError}
                    </span>
                  </div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Change Password
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="patientProfile-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td className="profileField">Name</td>
                    <td> : </td>
                    <td className="profileDescription">{data.fullName}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Email</td>
                    <td> : </td>
                    <td className="profileDescription">{data.email}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Mobile</td>
                    <td> : </td>
                    <td className="profileDescription">{data.phone}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Dignosis</td>
                    <td> : </td>
                    <td className="profileDescription">{data.diagnosis}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Prescribed Medication</td>
                    <td> : </td>
                    <td className="profileDescription">
                      {data.prescribedMedication}
                    </td>
                  </tr>
                  <tr>
                    <td className="profileField">Address</td>
                    <td> : </td>
                    <td className="profileDescription">{data.address}</td>
                  </tr>
                  <tr>
                    <td className="profileField">City</td>
                    <td> : </td>
                    <td className="profileDescription">{data.city}</td>
                  </tr>
                  <tr>
                    <td className="profileField">State</td>
                    <td> : </td>
                    <td className="profileDescription">{data.state}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Country</td>
                    <td> : </td>
                    <td className="profileDescription">{data.country}</td>
                  </tr>
                  <tr>
                    <td className="profileField">Pincode</td>
                    <td> : </td>
                    <td className="profileDescription">{data.pincode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.data,
    patientID: state.data.patientProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
