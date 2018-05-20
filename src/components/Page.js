import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Login from './Login';
import Signup from './Signup';
import MainMenu from './MainMenu';
import Instructions from './Instructions';
import Loading from './Loading';
import EndGame from './EndGame';
import Game from './game/Game';
import Client from "./../Client";

const cookies = new Cookies();
const LOGIN_KEY = "login_key";
const PASS_KEY = "password_key";

export const PageState = {
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
            pageState: PageState.LOG_IN,
            email: '',
            password: '',
            loginMessage: '',
            signupMessage: '',
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
        this.logout = this.logout.bind(this);

        if(cookies.get(LOGIN_KEY) && cookies.get(PASS_KEY)) {
            this.handleLogin(cookies.get(LOGIN_KEY), cookies.get(PASS_KEY));
        }
    }

    handleLogin(email, password) {
        const params = {
            email: email,
            password: password
        };
        cookies.set(LOGIN_KEY, email, { path: '/' }); // TODO: Should probably store some auth token
        cookies.set(PASS_KEY, password, { path: '/' });
        Client.login(params, this.onLogin);
    }

    onLogin(res) {
        if (res.error)
            this.setState({
                loginMessage: res.body.message
            });
        else if(res.body) {
            this.setState({
                loginMessage: '',
                username: res.body.username,
                rating: res.body.rating
            })
            this.openMainMenu();
        }
    }

    handleSignup(email, username, password) {
        const params = {
            email: email,
            username: username,
            password: password
        };
        Client.signup(params, this.onSignup);
    }

    onSignup(res) {
        if(res.error)
            this.setState({
                signupMessage: res.body.message
            });
        else {
            this.setState({
                loginMessage: 'Account Successfully Created'
            });
            this.setState({
                pageState: PageState.LOG_IN
            });
        }
    }

    openLogin() {
        this.setState({
            pageState: PageState.LOG_IN
        });
    }

    openSignup() {
        this.setState({
            pageState: PageState.SIGN_UP
        });
    }

    openMainMenu() {
        this.setState({
            pageState: PageState.MAIN_MENU
        });
    }

    joinGame() {
        const params = {
            username: this.state.username
        }
        this.setState({
            pageState: PageState.LOADING
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
                pageState: PageState.GAME
            });
        }
    }

    onGameEnded(wonGame) {
       this.setState({
           pageState: PageState.END_GAME,
           mostRecentGameWon: wonGame
       });
    }

    openInstructions() {
        this.setState({
            pageState: PageState.INSTRUCTIONS
        });
    }

    leaveQueue() {
        this.openMainMenu();
        const params = {
            username: this.state.username
        }
        Client.leaveQueue(params, this.onLeftQueue);
    }

    onLeftQueue(res) {
        Client.disconnectFromWS();
    }

    logout() {
        cookies.remove(LOGIN_KEY, { path: '/' });
        cookies.remove(PASS_KEY, { path: '/' });
        this.openLogin();
    }

    render() {
        var childPage;
        switch (this.state.pageState) {
            case PageState.LOG_IN:
                childPage = (<Login handleLogin={this.handleLogin}
                            openSignup={this.openSignup}
                message={this.state.loginMessage} />);
                break;
            case PageState.SIGN_UP:
                childPage = (<Signup handleSignup={this.handleSignup}
                            openLogin={this.openLogin}
                message={this.state.signupMessage} />);
                break;
            case PageState.MAIN_MENU:
                childPage = (<MainMenu username={this.state.username}
                            rating={this.state.rating}
                            joinGame={this.joinGame}
                            openInstructions={this.openInstructions}
                logout={this.logout} />);
                break;
            case PageState.INSTRUCTIONS:
                childPage = (<Instructions goBack={this.openMainMenu} />);
                break;
            case PageState.LOADING:
                childPage = (<Loading cancelLoading={this.leaveQueue} />);
                break;
            case PageState.GAME:
                document.body.style = 'background: #212121;';
                childPage = (<Game username={this.state.username}
                            opponentUsername={this.state.opponentUsername}
                            isPlayerOne={this.state.isPlayerOne}
                            gameIndex={this.state.gameIndex}
                            onGameEnded={this.onGameEnded} />);
                break;
            case PageState.END_GAME:
                document.body.style = 'background: #f44336;';
                childPage = (<EndGame gameWon={this.state.mostRecentGameWon}
                            joinGame={this.joinGame}
                            openMainMenu={this.openMainMenu}/>);
                break;
            default:
                childPage = (<Login handleEmailChange={this.handleEmailChange}
                            handlePasswordChange={this.handlePasswordChange}
                            handleLogIn={this.handleLogIn} />);
        }
        return (<div className='Page'>{childPage}</div>)
    }
}

export default Page;