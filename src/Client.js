var unirest = require('unirest');
var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

const BASE_URL = "http://localhost:3001/";

// User Authentication Functions

function login(params, callback) {
    var req = unirest("POST", BASE_URL + "login");
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
    var req = unirest("POST", BASE_URL + "signup");
    req.headers({
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
    })
    .form({
            "username": params.username,
            "email": params.email,
            "password": params.password
    })
    .end(callback);
}

// Game joining functions

function joinGame(params, callback) {
    var req = unirest("POST", BASE_URL + "join_game");
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
    var req = unirest("POST", BASE_URL + "leave_queue");
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
    var req = unirest("POST", BASE_URL + "bid");
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
    var req = unirest("POST", BASE_URL + "make_move");
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
    var socket = SockJS(BASE_URL + 'bidtactoe-ws/');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/public/' + username, callback);
    });
}

function disconnectFromWS() {
    if (stompClient != null)
        stompClient.disconnect();
}

const Client = { login, signup, joinGame, leaveQueue, makeBid, makeMove, subscribeToWS, disconnectFromWS };
export default Client;
