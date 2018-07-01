import React from "react";
import "./../css/App.css";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <div className="Navigation">
        <Link to="/about" className="Navigation-Link">
          About
        </Link>
        <Link to="/contact" className="Navigation-Link">
          Contact
        </Link>
        <Link to="/privacy-policy" className="Navigation-Link">
          Privacy Policy
        </Link>
      </div>
    );
  }
}
export default Navigation;
