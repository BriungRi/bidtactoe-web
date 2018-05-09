import React, { Component } from 'react';
import './../css/App.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.handleSignup(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form className="Login-form" onSubmit={this.handleSubmit}>
          <label className="Login-label">Username</label>
          <br />
          <input className="Login-input" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          <br /><br />
          <label className="Login-label">Email</label>
          <br />
          <input className="Login-input" type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <br /><br />
          <label className="Login-label">Password</label>
          <br />
          <input className="Login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <br /><br />
          <input type="submit" value="Sign Up" />
        </form>
        <br/><br/>
        <button className="Link"
          onClick={this.props.openLogin}><u>Already have an account? Log in</u></button>
      </div>
    );
  }
}

export default Signup;