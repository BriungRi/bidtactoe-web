var unirest = require('unirest');
const BASE_URL = "http://129.22.39.117:8080/"

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

const Client = { login };
export default Client;