import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";
import { Link } from "react-router-dom";


class MainMenu extends Component {
  render() {
    return (
      <div className="Main-Menu">
        <p className="Regular-Text">Hi, {this.props.username}</p>
        <br />
        <Button className="Menu-Button" onClick={this.props.joinGame}>
          Normal Game
        </Button>
        <br />
        <br />
        <Link to="/instructions">
          <Button className="Menu-Button">Instructions</Button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

export default MainMenu;
