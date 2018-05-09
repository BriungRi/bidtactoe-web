import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import MainMenu from './MainMenu';
import Instructions from './Instructions';
import Loading from './Loading';
import EndGame from './EndGame';
import Game from './game/Game';
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
            gameIndex: -1,
            isPlayerOne: false,
            opponentUsername: '',
            mostRecentGameWon: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.onSignup = this.onSignup.bind(this);
        this.openLogin = this.openLogin.bind(this);
        this.openSignup = this.openSignup.bind(this);
        this.openMainMenu = this.openMainMenu.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.onJoinGame = this.onJoinGame.bind(this);
        this.onGameFound = this.onGameFound.bind(this);
        this.leaveQueue = this.leaveQueue.bind(this);
        this.onLeftQueue = this.onLeftQueue.bind(this);
        this.openInstructions = this.openInstructions.bind(this);
        this.onGameEnded = this.onGameEnded.bind(this);
    }

    handleLogin(email, password) {
        console.log("Handle login");
        const params = {
            email: email,
            password: password
        };
        Client.login(params, this.onLogin);
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

    handleSignup(username, email, password) {
        const params = {
            username: username,
            email: email,
            password: password
        };
        Client.signup(params, this.onSignup);
    }

    onSignup(res) {
        if(res.error)
            alert(res.body.message);
        else {
            alert("Account successfully created");
            this.setState({
                applicationState: ApplicationState.LOG_IN
            });
        }
    }

    openLogin() {
        this.setState({
            applicationState: ApplicationState.LOG_IN
        });
    }

    openSignup() {
        this.setState({
            applicationState: ApplicationState.SIGN_UP
        });
    }

    openMainMenu() {
        this.setState({
            applicationState: ApplicationState.MAIN_MENU
        });
    }

    joinGame() {
        const params = {
            username: this.state.username
        }
        this.setState({
            applicationState: ApplicationState.LOADING
        })
        Client.subscribeToWS(this.state.username, this.onGameFound); // TODO: Must make these go in order
        Client.joinGame(params, this.onJoinGame)
    }

    onJoinGame(res) {
        if (res.error) {
            alert(res.body.message);
        } 
    }

    onGameFound(message) {
        Client.disconnectFromWS();
        if (message.body) {
            var payload = JSON.parse(message.body);
            var opponentUsername;
            var isPlayerOne;
            if (this.state.username === payload.playerOneUsername) {
                opponentUsername = payload.playerTwoUsername;
                isPlayerOne = true;
            }
            else { 
                opponentUsername = payload.playerOneUsername;
                isPlayerOne = false;
            }
            this.setState({
                gameIndex: payload.gameIndex,
                isPlayerOne: isPlayerOne,
                opponentUsername: opponentUsername,
                applicationState: ApplicationState.GAME
            })
        }
    }

    onGameEnded(wonGame) {
       this.setState({
           applicationState: ApplicationState.END_GAME,
           mostRecentGameWon: wonGame
       });
    }

    openInstructions() {
        this.setState({
            applicationState: ApplicationState.INSTRUCTIONS
        });
    }

    leaveQueue() {
        const params = {
            username: this.state.username
        }
        Client.leaveQueue(params, this.onLeftQueue)
    }

    onLeftQueue(res) {
        Client.disconnectFromWS();
        if (res.error) {
            alert(res.body.message);
        } else {
            this.openMainMenu();
        }
    }

    render() {
        switch (this.state.applicationState) {
            case ApplicationState.LOG_IN:
                return <Login handleLogin={this.handleLogin}
                openSignup={this.openSignup} />;
            case ApplicationState.SIGN_UP:
                return <Signup handleSignup={this.handleSignup}
                openLogin={this.openLogin} />;
            case ApplicationState.MAIN_MENU:
                return <MainMenu username={this.state.username}
                    rating={this.state.rating}
                    joinGame={this.joinGame}
                    openInstructions={this.openInstructions} />;
            case ApplicationState.INSTRUCTIONS:
                return <Instructions goBack={this.openMainMenu} />;
            case ApplicationState.LOADING:
                return <Loading cancelLoading={this.leaveQueue} />;
            case ApplicationState.GAME:
                return <Game opponentUsername={this.state.opponentUsername}
                    username={this.state.username}
                    isPlayerOne={this.state.isPlayerOne}
                    gameIndex={this.state.gameIndex}
                    onGameEnded={this.onGameEnded} />;
            case ApplicationState.END_GAME:
                return <EndGame gameWon={this.state.mostRecentGameWon}
                    joinGame={this.joinGame}
                    openMainMenu={this.openMainMenu}/>;
            default:
                return <Login handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLogIn={this.handleLogIn} />
        }
    }
}

export default Page;