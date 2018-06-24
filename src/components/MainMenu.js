import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";

class MainMenu extends Component {
  render() {
    return (
      <div className="Main-Menu">
        <p className="Regular-Text">
          Welcome back, {this.props.username}
          <br />
          Current rating: {this.props.rating}
        </p>
        <br />
        {/* <Button>Ranked</Button>
                <br /><br /> */}
        <Button className="Menu-Button" onClick={this.props.joinGame}>
          Normal Game
        </Button>
        <br />
        <br />
        <Button className="Menu-Button" onClick={this.props.openInstructions}>
          Instructions
        </Button>
        <br />
        <br />
        <Button className="Menu-Button" onClick={this.props.logout}>
          Logout
        </Button>
        <br />
        <br />
      </div>
    );
  }
}

export default MainMenu;
