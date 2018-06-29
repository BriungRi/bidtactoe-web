import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";
import { Link } from "react-router-dom";

class Instructions extends Component {
  render() {
    return (
      <div className="Instructions">
        <h3>Instructions</h3>
        <p>
          How to win: Get 3 in a row<br />
          <br />The Catch: You must win a bid in order to make a move<br />
          <br />How Bidding Works: Each player starts off with 100 bidding
          power. Before each move is made, both players will anonymously bid a
          value between 0 and their current bidding power. The winner of the bid
          will be able to make a move but will lose bidding power equivalent to
          the highest bid of that turn. The loser of the bid will be unable to
          make a move but will gain bidding power equivalent to the highest bid
          of that turn.
        </p>
        <Link to="/">
          <Button>Done</Button>
        </Link>
      </div>
    );
  }
}

export default Instructions;
