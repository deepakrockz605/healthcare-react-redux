import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { viewPatientProfile, login } from "../Actions/index";
import { loginUtil } from "./Util";
import { guestLogin, doctorLogin } from "../Services/services";
import Loader from "./Loader";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      userRole: "",
      error: {},
      isLoader: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    let userRole = this.props.state.userRole;
    this.setState({
      userRole,
    });

    if (userRole === "") {
      this.props.history.history.push("/");
    }
  }

  valid() {
    if (this.state.email === "" && this.state.password === "") {
      this.setState({
        emailError: "Email can not be empty!!",
        passError: "Password can not be empty!!",
      });
    } else if (!this.state.email.includes("@")) {
      this.setState({ emailError: "Invalid Email" });
    } else if (this.state.password === "") {
      this.setState({ passError: "Password can not be empty!!" });
    } else {
      return true;
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({ emailError: "", passError: "" });
    if (this.valid()) {
      this.setState({ isLoader: true });
      if (this.state.userRole === "Guest") {
        console.log("guest");
        guestLogin(user).then((res) => {
          if (res.success) {
            this.setState({ isLoader: false });
            toastr.success(res.success);
            loginUtil();
            this.props.login(true);
            let patientProfile = res.user;
            this.props.viewPatientProfile(patientProfile);
            this.props.history.push("/dashboard");
          } else {
            this.setState({ isLoader: false });
            this.setState({ emailError: res.error, passError: res.error });
          }
        });
      }
      if (this.state.userRole === "Doctor") {
        doctorLogin(user).then((res) => {
          if (res.success) {
            this.setState({ isLoader: false });
            loginUtil();
            this.props.login(true);
            this.props.history.push("/dashboard");
          } else {
            this.setState({ isLoader: false });
            this.setState({ emailError: res.error, passError: res.error });
          }
        });
      }
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <Loader />
            </div>
          </div>
        ) : null}
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <i className="material-icons right">https</i>
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form onSubmit={this.handleLogin}>
              <div className="input-field col s6">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className=""
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  autoComplete="off"
                />
                <label htmlFor="email" className="">
                  Email
                </label>
                <span className="fieldError">{this.state.emailError}</span>
              </div>

              <div className="input-field col s6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className=""
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  autoComplete="off"
                />
                <label htmlFor="password" className="">
                  Password
                </label>
                <span className="fieldError">{this.state.passError}</span>
              </div>

              <div className="d-flex justify-content-center mt-3 login_container">
                <button
                  type="submit"
                  name="button"
                  className="btn waves-effect waves-light login_btn"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewPatientProfile: (val) => {
      dispatch(viewPatientProfile(val));
    },
    login: (val) => {
      dispatch(login(val));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
