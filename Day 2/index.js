// 导入 HTTP 模块
const http = require('http');

// 定义请求监听器函数
const requestListener = function (req, res) {
    res.writeHead(200); // 设置状态码为 200（OK）
    res.end('Hello, World!'); // 发送响应 "Hello, World!"
};

// 定义端口号
const port = 8080;

// 使用请求监听器函数创建 HTTP 服务器
const server = http.createServer(requestListener);

// 启动服务器并监听指定端口
server.listen(port);
console.log('服务器正在监听端口: ' + port);
