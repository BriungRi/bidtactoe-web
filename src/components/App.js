import React, { Component } from 'react';
import './../css/App.css';
import Page, { ApplicationState } from './Page';
import Logo from './Logo';

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Page applicationState={ApplicationState.LOG_IN} />
      </div>
    );
  }
}

export default App;
