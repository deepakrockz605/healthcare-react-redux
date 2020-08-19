import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { checkUser } from "../Actions/index";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleUserAuth = (e) => {
    this.props.checkUser(e);
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="Role-Container">
        <h3 className="center">Welcome !!!</h3>
        <p className="center youare">You are a </p>
        <div className="users-section">
          <div
            className="usersBtn"
            onClick={(e) => this.handleUserAuth("Doctor")}
          >
            Doctor
          </div>
          <div
            className="usersBtn"
            onClick={(e) => this.handleUserAuth("Guest")}
          >
            Patient
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
    checkUser: (keyx) => {
      dispatch(checkUser(keyx));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
