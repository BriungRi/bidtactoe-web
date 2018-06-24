import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";
import { EndGameState } from "./Page";

class EndGame extends Component {
  render() {
    var titleMessage = "You tied.";
    if (this.props.endGameState === EndGameState.WON) titleMessage = "You Won!";
    else if (this.props.endGameState === EndGameState.LOST)
      titleMessage = "You Lost.";
    return (
      <div className="End-Game">
        <h1>{titleMessage}</h1>
        <br />
        <Button onClick={this.props.joinGame}>Play Again</Button>
        <br />
        <br />
        <Button onClick={this.props.openMainMenu}>Main Menu</Button>
      </div>
    );
  }
}

export default EndGame;
