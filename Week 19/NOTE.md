## 发布系统
1. 线上服务系统：真正的用户使用；
2. 发布系统：程序员向发布使用，和线上服务同级部署；
3. 发布工具：和发布系统对接的工具；

## 环境准备：
1. 安装虚拟机 VirtualBox
2. 安装Ubuntu，镜像地址改成 http://mirror.aliyun.com/nbuntu
4. 安装包管理工具

```
$ sudo apt install nodejs
```

4. 安装npm
```
$ sudo apt install npm
```

5. 查看npm版本 
```
$ npm --version
```

6. 安装更新的包
```
$ sudo npm install -g n
```

7. 安装最新版
```
$ sudo n latest
```

8. 设置PATH
```
$ PATH="$PATH"
```

## 编写服务器
服务器框架 Express
```
$ npx express-generator
$ npm install
$ npm start /* npm 的 script 为 start 时可以省略  run */
```

部署服务器
启动ssh，启动成功后开启了22端口，可以远程也可以传文件，设置端口转发 8022 -> 22
```
$ service ssh start
```

拷贝文件，设置端口转发 8080 -> 3000
```
$ scp -P 8022 -r ./* allen@127.0.0.1:/home/allen/server
$ npm start
```

用Node启动一个server
```
let http = require("http")

http.createServer(function(req, res) {
    console.log(res);
    res.end("Hello world!");
}).listen(8082)
```
```
$ node server.js
```

用Node发送请求
```
let http = require("http");

let request = http.request({
    hostname: "127.0.0.1",
    port:8082
}, response => {
    console.log(response)
});

request.end();
```

Nodejs流：https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable


```
$ npm start& /*加了&后不会阻止console.log*/
```

## 实现多文件发布
pipe：把一个流导入到另一个流

压缩工具
```
$ npm install archiver --save

```
解压工具
```
$ npm install unzipper --save

```

## 接入github 认证
https://docs.github.com/en/developers/apps/authorizing-oauth-apps

1. 打开登录页面：https://github.com/login/oauth/authorize
2. auth路由：接受code，用code+clien_id+client_secret换token
3. 创建server，接受token，点击发布
4. publish路由，用token获取用户信息，检查权限，接受发布