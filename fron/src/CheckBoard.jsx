import React, { Component } from "react";
import { Icon, Typography } from "antd";

import Checker from "./Checker";

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class CheckerBoard extends Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
          <Checker></Checker>
      </div>
    );
  }
}

export default CheckerBoard;
