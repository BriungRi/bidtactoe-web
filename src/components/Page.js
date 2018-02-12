import React, { Component } from 'react';
import Login from './Login';
import MainMenu from './MainMenu';
import Instructions from './Instructions';
import Loading from './Loading';
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
        this.openMainMenu = this.openMainMenu.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.openInstructions = this.openInstructions.bind(this);
        this.cancelLoading = this.cancelLoading.bind(this);
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
            alert(res.body.message);
        else if(res.body) {
            this.setState({
                username: res.body.username,
                rating: res.body.rating
            })
            this.openMainMenu();
        }
    }

    openMainMenu() {
        this.setState({
            applicationState: ApplicationState.MAIN_MENU,
        });
    }

    joinGame() {
        console.log("Joining Game");
        Client.joinGame()
        this.setState({
            applicationState: ApplicationState.LOADING
        });
    }

    openInstructions() {
        this.setState({
            applicationState: ApplicationState.INSTRUCTIONS
        });
    }

    cancelLoading() {
        console.log("Cancelling loading");
        this.openMainMenu();
    }

    render() {
        switch (this.state.applicationState) {
            case ApplicationState.LOG_IN:
                return <Login handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLogIn={this.handleLogIn} />;
            case ApplicationState.MAIN_MENU:
                return <MainMenu username={this.state.username}
                    rating={this.state.rating}
                    joinGame={this.joinGame}
                    openInstructions={this.openInstructions} />;
            case ApplicationState.INSTRUCTIONS:
                return <Instructions goBack={this.openMainMenu} />;
            case ApplicationState.LOADING:
                return <Loading cancelLoading={this.cancelLoading} />;
            default:
                return <Login handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLogIn={this.handleLogIn} />
        }
    }
}

export default Page;