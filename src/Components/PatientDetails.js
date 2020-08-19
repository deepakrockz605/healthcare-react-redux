import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { logout } from "../Actions/index";
import { logoutUtil } from "./Util";
import { getPatient, addNewPatient, updatePatient } from "../Services/services";
import Loader from "./Loader";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class PatientDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      age: "",
      email: "",
      password: "Healthcare",
      phone: "",
      diagnosis: "",
      prescribedMedication: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      isLoader: false,
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.name === "phone" || e.target.name === "pincode") {
      if (e.target.value === "" || re.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  componentDidMount = async (e) => {
    let id = this.props.state.userID;
    let count = this.props.state.userCount;
    this.setState({ isLoader: true });
    if (count === "existed") {
      getPatient(id).then((res) => {
        this.setState({
          id: res._id,
          fullName: res.fullName,
          age: res.age,
          email: res.email,
          phone: res.phone,
          diagnosis: res.diagnosis,
          prescribedMedication: res.prescribedMedication,
          address: res.address,
          city: res.city,
          state: res.state,
          country: res.country,
          pincode: res.pincode,
          user: "existed",
          isLoader: false,
        });
      });
    }

    if (count === "new") {
      this.setState({
        user: "new",
        isLoader: false,
      });
    }

    if (count === "" || count === undefined) {
      this.props.history.push("/dashboard");
    }
  };

  valid() {
    const errors = {};
    let count = 0;

    if (
      this.state.fullName === "" ||
      !this.state.fullName.match(/^[a-zA-Z ]*$/)
    ) {
      errors.fullNameError = "Invalid Name";
      count = count + 1;
    }

    if (this.state.phone === "" || this.state.phone.length <= 9) {
      errors.mobileError = "Invalid Mobile Number";
      count = count + 1;
    }

    if (
      this.state.email === "" ||
      !this.state.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    ) {
      errors.emailError = "Invalid Email";
      count = count + 1;
    }

    if (this.state.diagnosis === "" || this.state.diagnosis.length <= 5) {
      errors.diagnosisError = "Minimum 5 characters Required";
      count = count + 1;
    }

    if (
      this.state.prescribedMedication === "" ||
      this.state.prescribedMedication.length <= 5
    ) {
      errors.medicationError = "Minimum 5 characters Required";
      count = count + 1;
    }

    if (this.state.address === "") {
      errors.addressError = "Required";
      count = count + 1;
    }
    if (this.state.city === "") {
      errors.cityError = "Required";
      count = count + 1;
    }
    if (this.state.state === "") {
      errors.stateError = "Required";
      count = count + 1;
    }
    if (this.state.country === "") {
      errors.countryError = "Required";
      count = count + 1;
    }

    if (this.state.pincode === "" || this.state.pincode.length <= 5) {
      errors.pincodeError = "Required";
      count = count + 1;
    }

    return { errors, count };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {} });
    const returnData = this.valid();
    const errors = returnData.errors;
    this.setState({ errors });
    if (returnData.count < 1) {
      let user = this.state.user;
      if (user === "new") {
        addNewPatient(this.state).then((res) => {
          if (res.success) {
            toastr.success(res.success);
            this.setState({ isLoader: false });
            this.props.history.push("/dashboard");
          } else {
            let errors = {};
            this.setState({ isLoader: false });
            errors.emailError = res.error;
            this.setState({ errors });
            toastr.error(res.error);
          }
        });
      } else {
        let id = this.props.state.userID;
        this.setState({ isLoader: true });
        updatePatient(id, this.state).then((res) => {
          if (res.success) {
            toastr.success(res.success);
            this.setState({ isLoader: false });
            this.props.history.push("/dashboard");
          } else {
            this.setState({ isLoader: false });
            let errors = {};
            errors.emailError = res.error;
            this.setState({ errors });
            toastr.error(res.error);
          }
        });
      }
    }
  };

  handleLogout = (e) => {
    logoutUtil();
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        {this.state.isLoader ? (
          <div className="loader-resto">
            <div className="loader">
              <Loader />
            </div>
          </div>
        ) : null}
        <div className="">
          <div className="PatientDetails-Section">
            <div className="resetPasswordBtn">
              <button
                className="btn waves-effect waves-light logoutBtn right"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </div>

            <div className="PatientDetails-Wrapper">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.fullName.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      person
                    </i>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="autocomplete"
                      value={this.state.fullName}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="fullName"
                      className={this.state.fullName.length > 0 ? "active" : ""}
                    >
                      Full Name
                    </label>
                    <span className="fieldError">
                      {this.state.errors.fullNameError}
                    </span>
                  </div>
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.phone.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      phone
                    </i>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="autocomplete"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      maxLength={10}
                    />
                    <label
                      htmlFor="phone"
                      className={this.state.phone.length > 0 ? "active" : ""}
                    >
                      Phone
                    </label>
                    <span className="fieldError">
                      {this.state.errors.mobileError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.email.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      email
                    </i>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="autocomplete"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="email"
                      className={this.state.email.length > 0 ? "active" : ""}
                    >
                      Email
                    </label>
                    <span className="fieldError">
                      {this.state.errors.emailError}
                    </span>
                  </div>
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.phone.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      vpn_lock
                    </i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="autocomplete"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      disabled={true}
                    />
                    <label
                      htmlFor="password"
                      className={this.state.password.length > 0 ? "active" : ""}
                    >
                      Password
                    </label>
                    <span className="defaultPassword">
                      Default Password is <b>"Healthcare"</b>
                    </span>
                    <span className="fieldError">
                      {this.state.errors.passwordError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <i
                      className={
                        this.state.diagnosis.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      local_pharmacy
                    </i>
                    <input
                      type="text"
                      id="diagnosis"
                      name="diagnosis"
                      className="autocomplete"
                      value={this.state.diagnosis}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="diagnosis"
                      className={
                        this.state.diagnosis.length > 0 ? "active" : ""
                      }
                    >
                      Diagnosis
                    </label>
                    <span className="fieldError">
                      {this.state.errors.diagnosisError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <i
                      className={
                        this.state.prescribedMedication.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      done_all
                    </i>
                    <input
                      type="text"
                      id="prescribedMedication"
                      name="prescribedMedication"
                      className="autocomplete"
                      value={this.state.prescribedMedication}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="prescribedMedication"
                      className={
                        this.state.prescribedMedication.length > 0
                          ? "active"
                          : ""
                      }
                    >
                      Prescribed Medication
                    </label>
                    <span className="fieldError">
                      {this.state.errors.medicationError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.address.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      location_on
                    </i>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="autocomplete"
                      value={this.state.address}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="address"
                      className={this.state.address.length > 0 ? "active" : ""}
                    >
                      Address
                    </label>
                    <span className="fieldError">
                      {this.state.errors.addressError}
                    </span>
                  </div>
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.city.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      location_city
                    </i>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="autocomplete"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="city"
                      className={this.state.city.length > 0 ? "active" : ""}
                    >
                      City
                    </label>
                    <span className="fieldError">
                      {this.state.errors.cityError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.state.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      location_city
                    </i>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="autocomplete"
                      value={this.state.state}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="state"
                      className={this.state.state.length > 0 ? "active" : ""}
                    >
                      State
                    </label>
                    <span className="fieldError">
                      {this.state.errors.stateError}
                    </span>
                  </div>
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.country.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      location_city
                    </i>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="autocomplete"
                      value={this.state.country}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="country"
                      className={this.state.country.length > 0 ? "active" : ""}
                    >
                      Country
                    </label>
                    <span className="fieldError">
                      {this.state.errors.countryError}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <i
                      className={
                        this.state.pincode.length > 0
                          ? "material-icons prefix active"
                          : "material-icons prefix"
                      }
                    >
                      pin_drop
                    </i>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="autocomplete"
                      value={this.state.pincode}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      maxLength={6}
                    />
                    <label
                      htmlFor="pincode"
                      className={this.state.pincode.length > 0 ? "active" : ""}
                    >
                      Pincode
                    </label>
                    <span className="fieldError">
                      {this.state.errors.pincodeError}
                    </span>
                  </div>
                </div>
                <div className="row submitBtnRow">
                  <button
                    className="btn waves-effect waves-light cancelBtn"
                    type="button"
                    name="action"
                    onClick={() => this.props.history.push("/dashboard")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Save Changes
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
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
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
