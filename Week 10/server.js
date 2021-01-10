const http = require("http");

const server = http.createServer((request, response) => {
    //body = Buffer.concat(body).toString();
    console.log("request received");
    console.log(request.headers);
    response.setHeader("Content-Type", "text/html");
    response.setHeader("X-Foo", "bar");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(
`<html maaa=a>
<head>
    <style>
#container {
    width: 500px;
    height: 300px;
    display: flex;
    background-color: rgb(255,255,255);
}
#container #myid {
    width: 200px;
    height: 100px;
    background-color: rgb(255,0,0);
}
#container .c1 {
    flex: 1;
    background-color: rgb(0,255,0);
}
    </style>
</head>
<body>
    <div id='container'>
        <img id='myid' />
        <img class='c1'/>
    </div>
</body>
</html>
`);
})

server.listen(8088);

console.log("server started");