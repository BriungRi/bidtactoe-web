const unirest = require("unirest");
const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

var BASE_URL;
if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://tactoe.bid:3001/";
} else if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3001/";
}

// User Authentication Functions

function login(params, callback) {
  const req = unirest("POST", BASE_URL + "login");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      email: params.email,
      password: params.password
    })
    .end(callback);
}

function signup(params, callback) {
  const req = unirest("POST", BASE_URL + "signup");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      email: params.email,
      username: params.username,
      password: params.password
    })
    .end(callback);
}

// Game joining functions

function createGame(params, callback) {
  const req = unirest("POST", BASE_URL + "create_game");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      username: params.username,
      deviceType: "web",
      deviceToken: ""
    })
    .end(callback);
}

function joinGame(params, callback) {
  const req = unirest("POST", BASE_URL + "join_game");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      username: params.username,
      deviceType: "web",
      deviceToken: "",
      gameCode: params.gameCode
    })
    .end(callback);
}

function joinRandomGame(params, callback) {
  const req = unirest("POST", BASE_URL + "join_random_game");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      username: params.username,
      deviceType: "web",
      deviceToken: ""
    })
    .end(callback);
}

function leaveQueue(params, callback) {
  const req = unirest("POST", BASE_URL + "leave_queue");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      username: params.username
    })
    .end(callback);
}

// Game functions

function makeBid(params, callback) {
  const req = unirest("POST", BASE_URL + "bid");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      username: params.username,
      gameIndex: params.gameIndex,
      bidAmt: params.bidAmt
    })
    .end(callback);
}

function makeMove(params, callback) {
  console.log("Game index: " + params.gameIndex);
  const req = unirest("POST", BASE_URL + "make_move");
  req
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
      gameIndex: params.gameIndex,
      cells: params.cells
    })
    .end(callback);
}

// Websockets

var stompClient;
function subscribeToWS(username, callback) {
  const socket = SockJS(BASE_URL + "bidtactoe-ws/");
  stompClient = Stomp.over(socket);
  stompClient.connect(
    {},
    function(frame) {
      stompClient.subscribe("/topic/public/" + username, callback);
    }
  );
}

function disconnectFromWS() {
  if (stompClient) stompClient.disconnect();
}

const Client = {
  login,
  signup,
  createGame,
  joinGame,
  joinRandomGame,
  leaveQueue,
  makeBid,
  makeMove,
  subscribeToWS,
  disconnectFromWS
};
export default Client;
