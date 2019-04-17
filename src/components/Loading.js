import React, { Component } from "react";
import Button from "muicss/lib/react/button";
import Lottie from "react-lottie";
import animationData from "./../loader.json";
import "./../css/App.css";

class Loading extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
    let gameCodeText;
    if (this.props.gameCode > 0) {
      gameCodeText = (
        <p className="Regular-Text">Game Code: {this.props.gameCode}</p>
      );
    }
    return (
      <div className="Loading">
        {gameCodeText}
        <Lottie options={defaultOptions} height={180} width={180} />
        <p className="Regular-Text">Looking for an opponent...</p>
        <Button onClick={this.props.cancelLoading}>Cancel</Button>
      </div>
    );
  }
}

export default Loading;
