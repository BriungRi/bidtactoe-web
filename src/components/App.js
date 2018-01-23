import React, { Component } from 'react';
import './../css/App.css';
import Page, { ApplicationState } from './Page';
import Logo from './Logo';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.initializeFirebase();
  }

  initializeFirebase() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBmNQKIkW7rzS5jcDOQKIMdUb1MEXTWuzU",
      authDomain: "bidtactoe-4b637.firebaseapp.com",
      databaseURL: "https://bidtactoe-4b637.firebaseio.com",
      projectId: "bidtactoe-4b637",
      storageBucket: "bidtactoe-4b637.appspot.com",
      messagingSenderId: "868694481977"
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(function () {
        console.log('permission granted');
      })
      .catch(function (err) {
        console.log('permission denied');
      });
    messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {

        }
      })
  }

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
