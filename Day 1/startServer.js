let server = http.createServer(function(request, response) {  
    // 定义一个响应体内容为 "Hello world!"
    let body = "Hello world!";

    // 设置响应头
    response.writeHead(200, {  // 200 状态码表示请求成功
        'Content-Length': body.length,  // 设置响应内容的长度，防止内容被截断
        'Content-Type': 'text/plain'    // 告知客户端响应内容的类型为纯文本
    });

    // 结束响应并发送响应内容
    response.end(body);
});

// 监听端口 8080，等待客户端请求
server.listen(8080);
