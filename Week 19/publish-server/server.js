let http = require("http");
let fs = require("fs");
let unzipper = require("unzipper");

http.createServer(function(request, response) {
    console.log("Request.")
    // let outfile = fs.createWriteStream("../server/public/tmp.zip");
    // request.pipe(outfile);

    request.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen(8082)