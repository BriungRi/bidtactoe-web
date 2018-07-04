import React, { Component } from "react";
import "./../../css/App.css";
import { DEFAULT_CELL_VALUE } from "./Game";

class Cell extends Component {
  render() {
    if (this.props.value !== DEFAULT_CELL_VALUE) {
      return (
        <td className="Square-on" onClick={this.props.onCellClick}>
          {this.props.value}
        </td>
      );
    } else
      return (
        <td className="Square-off" onClick={this.props.onCellClick}>
          `
        </td>
      );
  }
}

export default Cell;
