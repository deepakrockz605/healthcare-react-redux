import React, { PureComponent } from "react";

class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo center">
            Healthcare
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
