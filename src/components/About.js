import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div className="Instructions">
        <h2>About</h2>
        <p>
          Inspiration: I made BidTacToe with inspiration from a Quora answer
          that explored the idea of adding "bidding" to turn-based board games.
          When I showed my friends the concept of BidTacToe, we liked the
          concept of bidding but were frustrated by the need to hide bids and
          keep track of bidding powers.
          <br />
          <br />
          Currently: BidTacToe is available on{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.brianvli.bidtactoe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Android
          </a>{" "}
          and Web. If you join a random game and get paired with a Guest, you
          are most likely playing against the AI I developed for this game.
          <br />
          <br />
          In the future: BidTacToe will have an iOS app, an elo ranking
          system...
          <br />
          <br />
          Technical details: Backend and Android app are built with Kotlin. Web
          app is build in ReactJS. AI uses the Q-Learning reinforcement learning
          algorithm. The backing database is MongoDB.
        </p>
        <Link to="/">
          <Button>Done</Button>
        </Link>
      </div>
    );
  }
}

export default About;
