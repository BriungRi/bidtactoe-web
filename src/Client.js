const unirest = require('unirest');
const SockJS = require('sockjs-client');
const Stomp = require('stompjs');

const BASE_URL = "http://18.191.44.25:3001/";

// User Authentication Functions

function login(params, callback) {
    const req = unirest("POST", BASE_URL + "login");
    req.headers({
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
        "email": params.email,
        "password": params.password
    })
    .end(callback);
}

function signup(params, callback) {
    const req = unirest("POST", BASE_URL + "signup");
    req.headers({
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
            "email": params.email,
            "username": params.username,
            "password": params.password
    })
    .end(callback);
}

// Game joining functions

function joinGame(params, callback) {
    const req = unirest("POST", BASE_URL + "join_game");
    req.headers({
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
    })
        .form({
            username: params.username,
            deviceId: ""
        })
        .end(callback);
}

function leaveQueue(params, callback) {
    const req = unirest("POST", BASE_URL + "leave_queue");
    req.headers({
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
    })
        .form({
            username: params.username,
        })
        .end(callback);
}

// Game functions

function makeBid(params, callback) {
    const req = unirest("POST", BASE_URL + "bid");
    req.headers({
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
    req.headers({
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
    const socket = SockJS(BASE_URL + 'bidtactoe-ws/');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/public/' + username, callback);
    });
}

function disconnectFromWS() {
    if (stompClient)
        stompClient.disconnect();
}

const Client = { login, signup, joinGame, leaveQueue, makeBid, makeMove, subscribeToWS, disconnectFromWS };
export default Client;
