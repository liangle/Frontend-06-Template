# 浏览器工作原理
URL(HTTP) -> HTML(pase) -> DOM(css computing) -> DOM with CSS(layout) DOM with position(render) -> Bitmap

浏览器显示一个网页的步骤：
1. 浏览器请求URL并解析回应获得文本HTML；
2. 然后解析文本HTML得到DOM树；
3. CSS computing，算出DOM树上元素的CSS，譬如哪些会叠加、覆盖等；
4. 根据DOM的CSS进行布局，把DOM树所有元素产生盒的位置计算出来；
5. 根据DOM with position进行渲染，譬如背景、字体等，画到图片上；
6. 最后通过操作系统和硬件驱动提供的api展示；

# HTTP
### HTTP协议

**网络模型**
- ISO-OSI七层协议：应用 —— 表示 —— 会话 —— 传输 —— 网络 —— 数据链路 —— 物理层
- 简化：HTTP —— TCP —— Internet —— 4G、5G、Wi-Fi

**TCP与IP**
- TCP通过流传输，协议是给软件使用的；
- 软件去网卡那数据的时候，网卡会根据对应的端口号把数据包分给应用；
 
**HTTP**
- 一个Request对应一个Response

**NODE中使用网络**
- require("net")

**TCP传输**
- 通过包根据IP地址进行传输

**NODE中的libnet/libpcap**
- libnet负责构造IP包；
- libpcap负责从网卡抓所有流经网卡的IP包；

### HTTP传输包
HTTP是文本协议，跟二进制的协议相对，协议里的内容都是字符。

Request 结构

```
POST /HTTP/1.1                                              --Request line
Host:127.0.0.1
Content-Type:application/x-www.form-urlencoded              --Headers

field1=aaa&code=x%3D1                                       --Body
```


Response 结构

```
HTTP/1.1 200 OK                                             --status line
Content-Type:text/html
Date:Mon,23 Dec 2019 01:01:01 GMT
Connection:Keep-alive
Transfer-Encoding:chunked                                   --Headers

26                                                          --body内容长度
<html><body>Hello World</body></html>
0                                                           --body结束标志

                                                            --Body
```

**Response解析**

根据Response结构，通过状态机解析Response，状态包括：

```
this.WAITING_STATUS_LINE = 0;
this.WAITING_STATUS_LINE_END = 1;
this.WAITING_HEADER_NAME = 2;
this.WAITING_HEADER_SPACE = 3;
this.WAITING_HEADER_VALUE = 4;
this.WAITING_HEADER_LINE_END = 5;
this.WAITING_HEADER_BLOCK_END = 6;
this.WAITING_BODY = 7;
```



**Body解析**

Response的body根据Content-Type不同使用不同的Paser解析。