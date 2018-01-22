import React, { Component } from 'react';
import Login from './Login';
import MainMenu from './MainMenu';
import Client from "./../Client";

export const ApplicationState = {
    LOG_IN: 1,
    SIGN_UP: 2,
    MAIN_MENU: 3,
    INSTRUCTIONS: 4,
    LOADING: 5,
    GAME: 6,
    END_GAME: 7
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationState: ApplicationState.LOG_IN,
            email: '',
            password: '',
            username: '',
            rating: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.onLogin = this.onLogin.bind(this);
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

    handleLogIn(event) {
        const params = {
            email: this.state.email,
            password: this.state.password
        }
        Client.login(params, this.onLogin);
        event.preventDefault();
    }

    onLogin(res) {
        if (res.error)
            console.log(res.error);
        else {
            console.log(res.body);
            this.setState({
                applicationState: ApplicationState.MAIN_MENU,
                username: res.body.username,
                rating: res.body.rating
            })
        }
    }

    render() {
        switch (this.state.applicationState) {
            case ApplicationState.LOG_IN:
                return <Login handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLogIn={this.handleLogIn} />;
            case ApplicationState.MAIN_MENU:
                return <MainMenu username={this.state.username}
                    rating={this.state.password} />;
            default:
                return <Login handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLogIn={this.handleLogIn} />
        }
    }
}

export default Page;