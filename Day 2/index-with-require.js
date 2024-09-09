// 导入 HTTP 模块
const http = require('http');

// 导入 'today' 模块
const today = require('./today');

// 定义请求监听器函数
const requestListener = function (req, res) {
    res.writeHead(200); // 设置状态码为 200（OK）
    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // 发送响应，包含从 'today' 模块获取的当前日期
    res.end(`Hello, World! 今天的日期是 ${today.getDate()}`);
};

// 定义端口号
const port = 8080;

// 使用请求监听器函数创建 HTTP 服务器
const server = http.createServer(requestListener);

// 启动服务器并监听指定端口
server.listen(port);
console.log('服务器正在监听端口: ' + port);
