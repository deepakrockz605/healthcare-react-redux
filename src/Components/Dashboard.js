import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PatientProfile from "./PatientProfile";
import { viewPatientDetails, logout } from "../Actions/index";
import { logoutUtil } from "./Util";
import { getAllPatients, deletePatient } from "../Services/services";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Loader from "./Loader";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoader: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoader: true });
    getAllPatients().then((res) => {
      this.setState({
        users: res,
        isLoader: false,
      });
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateNew = (e) => {
    this.props.viewPatientDetails("new", 0);
    this.props.history.push("/patient-details");
  };

  delete(id) {
    this.setState({ isLoader: true });
    deletePatient(id).then((res) => {
      this.setState({ isLoader: false });
      toastr.success(res.success);
      this.componentDidMount();
    });
  }

  edit(id) {
    this.props.viewPatientDetails("existed", id);
    this.props.history.push("/patient-details");
  }

  handleLogout = (e) => {
    logoutUtil();
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="contentWrapper">
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <Loader />
            </div>
          </div>
        ) : null}
        <div className="">
          {this.props.userRole === "Doctor" ? (
            <div className="dashboard">
              <div className="row">
                <div className="dashbaordTop">
                  <label className="listPatient">List of Patients</label>
                  <div className="resetPasswordBtn">
                    <button
                      className="btn waves-effect waves-light"
                      onClick={this.handleCreateNew}
                    >
                      New Patient
                      <i className="material-icons right">create_new_folder</i>
                    </button>
                    <button
                      className="btn waves-effect waves-light logoutBtn"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {this.state.users.length > 0 ? (
                  <div className="col s12 tableRow">
                    <table className="responsive-table striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Diagnosis</th>
                          <th>Mobile</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.diagnosis}</td>
                            <td>{user.phone}</td>
                            <td>
                              <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={(e) => this.edit(user._id)}
                              >
                                <i className="material-icons">edit</i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={(e) => this.delete(user._id)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="tableRow">
                    <p className="noData">No Data to show</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <PatientProfile history={this.props.history} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.data,
    userRole: state.data.userRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewPatientDetails: (count, id) => {
      dispatch(viewPatientDetails(count, id));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
