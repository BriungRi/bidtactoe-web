import React, { Component } from "react";
import "./../css/App.css";
import Page from "./Page";
import Logo from "./Logo";
import { BrowserRouter, Route } from "react-router-dom";
import Instructions from "./Instructions";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Page} />
            <Route path="/instructions" component={Instructions} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
