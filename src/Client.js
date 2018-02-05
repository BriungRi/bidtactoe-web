var unirest = require('unirest');
var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

// const BASE_URL = "https://bidtactoe-backend.herokuapp.com/";
const BASE_URL = "http://localhost:8000/";

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

function joinGame() {
    var socket = SockJS(BASE_URL + 'bidtactoe-ws');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            console.log(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/topic/game_ready_update', function (greeting) {
            console.log(JSON.parse(greeting.body).content);
        });

        stompClient.send("/app/hello", {}, JSON.stringify({'name': 'brian'}));
        stompClient.send("/app/join_game", {}, JSON.stringify({}));
    });
}

const Client = { login, joinGame };
export default Client;
