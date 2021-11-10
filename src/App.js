import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "../src/routes/CustomRoutes";
import "antd/dist/antd.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    );
  }
}
export default App;
