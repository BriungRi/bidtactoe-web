import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import "./../css/App.css";
import { Link } from "react-router-dom";

class Contact extends Component {
  render() {
    return (
      <div className="Instructions">
        <h2>Contact</h2>
        <p>
          I'm always looking for ways to make BidTacToe more fun!
          <br />
          If you want specific features, find bugs, or just want to chat, I'm
          just a few HTTP(S) requests away!
          <br />
          <br />
          Author Name: Brian Li
          <br />
          Email: <a href="mailto:brnli7@gmail.com">brnli7@gmail.com</a>
          <br />
          Other:{" "}
          <a
            href="https://github.com/BriungRi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>{" "}
          <a
            href="https://linkedin.com/in/brianvli"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <br />
          <br />
        </p>
        <Link to="/">
          <Button>Done</Button>
        </Link>
      </div>
    );
  }
}

export default Contact;
