import React, { Component } from "react";
import Cookies from "universal-cookie";
import Login from "./Login";
import Signup from "./Signup";
import MainMenu from "./MainMenu";
import Loading from "./Loading";
import EndGame from "./EndGame";
import Game from "./game/Game";
import Client from "./../Client";
import Navigation from "./Navigation";

const adjNoun = require("adj-noun");
adjNoun.seed((Math.random() * 500) | 0);

const cookies = new Cookies();
const LOGIN_KEY = "login_key";
const PASS_KEY = "password_key";
const NUM_AI_WINS_KEY = "ai_wins_key";
const NUM_AI_TIES_KEY = "ai_ties_key";
const NUM_AI_LOSSES_KEY = "ai_losses_key";

export const PageState = {
  LOG_IN: 1,
  SIGN_UP: 2,
  MAIN_MENU: 3,
  LOADING: 5,
  GAME: 6,
  END_GAME: 7
};

export const EndGameState = {
  WON: 1,
  LOST: 2,
  TIED: 3
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: PageState.MAIN_MENU,
      email: "",
      password: "",
      loginMessage: "",
      signupMessage: "",
      username: adjNoun().join("-"),
      rating: "",
      gameIndex: -1,
      isPlayerOne: false,
      opponentUsername: "",
      endGameState: EndGameState.TIED,
      gameCode: -1,
      numAIWins: cookies.get(NUM_AI_WINS_KEY) || 0,
      numAITies: cookies.get(NUM_AI_TIES_KEY) || 0,
      numAILosses: cookies.get(NUM_AI_LOSSES_KEY) || 0
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.openSignup = this.openSignup.bind(this);
    this.openMainMenu = this.openMainMenu.bind(this);
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.joinRandomGame = this.joinRandomGame.bind(this);
    this.onGameCreated = this.onGameCreated.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
    this.onGameFound = this.onGameFound.bind(this);
    this.leaveQueue = this.leaveQueue.bind(this);
    this.onLeftQueue = this.onLeftQueue.bind(this);
    this.openInstructions = this.openInstructions.bind(this);
    this.onGameEnded = this.onGameEnded.bind(this);
    this.logout = this.logout.bind(this);
    this.updateAIStats = this.updateAIStats.bind(this);
    this.onNumAIWinsRcvd = this.onNumAIWinsRcvd.bind(this);
    this.onNumAITiesRcvd = this.onNumAITiesRcvd.bind(this);
    this.onNumAILossesRcvd = this.onNumAILossesRcvd.bind(this);
  }

  componentDidMount() {
    this.updateAIStats();
    this.timerID = setInterval(() => this.updateAIStats(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleLogin(email, password) {
    const params = {
      email: email,
      password: password
    };
    cookies.set(LOGIN_KEY, email, { path: "/" });
    cookies.set(PASS_KEY, password, { path: "/" });
    Client.login(params, this.onLogin);
  }

  onLogin(res) {
    if (res.error)
      this.setState({
        loginMessage: res.body.message
      });
    else if (res.body) {
      this.setState({
        loginMessage: "",
        username: res.body.username,
        rating: res.body.rating
      });
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
    if (res.error)
      this.setState({
        signupMessage: res.body.message
      });
    else {
      this.setState({
        loginMessage: "Account Successfully Created"
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

  createGame() {
    const params = {
      username: this.state.username
    };
    Client.subscribeToWS(this.state.username, this.onGameFound);
    Client.createGame(params, this.onGameCreated);
  }

  joinGame() {
    const gameCode = prompt("Enter game code: ");
    const params = {
      username: this.state.username,
      gameCode: gameCode
    };
    Client.subscribeToWS(this.state.username, this.onGameFound);
    Client.joinGame(params, this.onJoinGame);
  }

  joinRandomGame() {
    const params = {
      username: this.state.username
    };
    Client.subscribeToWS(this.state.username, this.onGameFound);
    Client.joinRandomGame(params, this.onJoinGame);
  }

  onGameCreated(res) {
    if (res.error) {
      alert(res.body.message);
    } else {
      this.setState({
        pageState: PageState.LOADING,
        gameCode: res.body.gameCode
      });
    }
  }

  onJoinGame(res) {
    if (res.error) {
      alert(res.body.message);
    } else {
      this.setState({
        pageState: PageState.LOADING
      });
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
      } else {
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

  onGameEnded(endState) {
    this.setState({
      pageState: PageState.END_GAME,
      endGameState: endState
    });
    this.updateAIStats();
  }

  openInstructions() {
    this.setState({
      pageState: PageState.INSTRUCTIONS
    });
  }

  leaveQueue() {
    this.openMainMenu();
    const params = {
      username: this.state.username,
      gameCode: -1
    };
    Client.leaveQueue(params, this.onLeftQueue);
  }

  onLeftQueue(res) {
    Client.disconnectFromWS();
  }

  logout() {
    cookies.remove(LOGIN_KEY, { path: "/" });
    cookies.remove(PASS_KEY, { path: "/" });
    this.openLogin();
  }

  updateAIStats() {
    Client.getNumAIWins(this.onNumAIWinsRcvd);
    Client.getNumAITies(this.onNumAITiesRcvd);
    Client.getNumAILosses(this.onNumAILossesRcvd);
  }

  onNumAIWinsRcvd(res) {
    if (res.error) {
      console.log(res.body.message);
    } else {
      this.setState({
        numAIWins: res.body.num
      });
      cookies.set(NUM_AI_WINS_KEY, this.state.numAIWins, { path: "/" });
    }
  }

  onNumAITiesRcvd(res) {
    if (res.error) {
      console.log(res.body.message);
    } else {
      this.setState({
        numAITies: res.body.num
      });
      cookies.set(NUM_AI_TIES_KEY, this.state.numAITies, { path: "/" });
    }
  }

  onNumAILossesRcvd(res) {
    if (res.error) {
      console.log(res.body.message);
    } else {
      this.setState({
        numAILosses: res.body.num
      });
      cookies.set(NUM_AI_LOSSES_KEY, this.state.numAILosses, { path: "/" });
    }
  }

  render() {
    var childPage;
    switch (this.state.pageState) {
      case PageState.LOG_IN:
        childPage = (
          <Login
            handleLogin={this.handleLogin}
            openSignup={this.openSignup}
            message={this.state.loginMessage}
          />
        );
        break;
      case PageState.SIGN_UP:
        childPage = (
          <Signup
            handleSignup={this.handleSignup}
            openLogin={this.openLogin}
            message={this.state.signupMessage}
          />
        );
        break;
      case PageState.MAIN_MENU:
        childPage = (
          <div>
            <MainMenu
              username={this.state.username}
              createGame={this.createGame}
              joinGame={this.joinGame}
              joinRandomGame={this.joinRandomGame}
              rating={this.state.rating}
              openInstructions={this.openInstructions}
              logout={this.logout}
              numWins={this.state.numAILosses}
              numTies={this.state.numAITies}
              numLosses={this.state.numAIWins}
            />
            <Navigation />
          </div>
        );
        break;
      case PageState.LOADING:
        childPage = (
          <Loading
            cancelLoading={this.leaveQueue}
            gameCode={this.state.gameCode}
          />
        );
        break;
      case PageState.GAME:
        childPage = (
          <Game
            username={this.state.username}
            opponentUsername={this.state.opponentUsername}
            isPlayerOne={this.state.isPlayerOne}
            gameIndex={this.state.gameIndex}
            onGameEnded={this.onGameEnded}
          />
        );
        break;
      case PageState.END_GAME:
        childPage = (
          <EndGame
            endGameState={this.state.endGameState}
            joinGame={this.joinRandomGame}
            openMainMenu={this.openMainMenu}
          />
        );
        break;
      default:
        childPage = (
          <Login
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
            handleLogIn={this.handleLogIn}
          />
        );
    }
    return <div className="Page">{childPage}</div>;
  }
}

export default Page;
