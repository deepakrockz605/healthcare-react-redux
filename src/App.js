import React, { PureComponent } from "react";
import RestrictedContainer from "./Components/RestrictedContainer";
import "./App.css";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <RestrictedContainer />
      </div>
    );
  }
}

export default App