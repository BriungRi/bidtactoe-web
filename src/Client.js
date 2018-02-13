var unirest = require('unirest');
var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

// const BASE_URL = "https://bidtactoe-backend.herokuapp.com/";
const BASE_URL = "http://localhost:3001/";

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

var stompClient;
function listenForGame(username, onGameFound) {
    var socket = SockJS(BASE_URL + 'bidtactoe-ws/');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/public/' + username, onGameFound);
    });
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

function stopListeningForGame() {
    if(stompClient)
        stompClient.disconnect();
}



const Client = { login, joinGame, listenForGame, leaveQueue, stopListeningForGame };
export default Client;
