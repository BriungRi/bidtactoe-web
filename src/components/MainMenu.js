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
        <Button className="Menu-Button" onClick={this.props.createGame}>
          Create Game Room
        </Button>
        <br />
        <br />
        <Button className="Menu-Button" onClick={this.props.joinGame}>
          Join Game Room
        </Button>
        <br />
        <br />
        <Button className="Menu-Button" onClick={this.props.joinRandomGame}>
           vs. AI
        </Button>
        <br />
        <br />
        <Link to="/instructions">
          <Button className="Menu-Button">Instructions</Button>
        </Link>
        <br />
        <br />
        <h3>Human vs. AI Record</h3>
        <br />
        <p>{this.props.numWins} - {this.props.numTies} - {this.props.numLosses}</p>
      </div>
    );
  }
}

export default MainMenu;
