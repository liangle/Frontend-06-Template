let http = require("http");
let https = require("https");
let fs = require("fs");
let unzipper = require("unzipper");
let querystring = require("querystring");
const { callbackify } = require("util");

//2. auth路由：接受code，用code+clien_id+client_secret换token

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);

    getToken(query.code, function(info) {
        response.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`);
        response.end();
    });
}

function getToken(code, callback) {
    let request = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.fd3d9d006f6756cd&client_secret=4f52ef274fd9dcac65298926700c2862bb82a3b3`,
        port: 443,
        method: "POST",
        "User-Agent": "publishapp"
    }, function(response) {
        let body = "";
        response.on("data", chunk => {
            body += chunk.toString();
        });
        response.on("end", chunk => {
            callback(querystring.parse(body));
        });
    })

    request.end();
}

//4. publish路由，用token获取用户信息，检查权限，接受发布

function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    getUser(query.token, info => {
        if (info.login === "liangle") {
            request.pipe(unzipper.Extract({ path: '../server/public/' }));
            request.on("end", function() {
                response.end("success!");
            });
        }
    });
}

function getUser(token, callback) {
    let request = https.request({
        hostname: "api.github.com",
        path: `/user`,
        port: 443,
        method: "GET", 
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "publishapp"
        }
    }, function(response) {
        let body = "";
        response.on("data", chunk => {
            body += chunk.toString();
        });
        response.on("end", chunk => {
            callback(JSON.parse(body));
        });
    })

    request.end();
}

http.createServer(function(request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }
}).listen(8082)