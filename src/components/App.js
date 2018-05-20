import React, { Component } from 'react';
import './../css/App.css';
import Page, { PageState } from './Page';
import Logo from './Logo';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Logo />
        <Page className='Page'
          pageState={PageState.LOG_IN} />
      </div>
    );
  }
}

export default App;