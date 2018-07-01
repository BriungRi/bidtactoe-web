import React, { Component } from "react";
import "./../css/App.css";
import Page from "./Page";
import Logo from "./Logo";
import { BrowserRouter, Route } from "react-router-dom";
import Instructions from "./Instructions";
import About from "./About";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Page} />
            <Route path="/instructions" component={Instructions} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
