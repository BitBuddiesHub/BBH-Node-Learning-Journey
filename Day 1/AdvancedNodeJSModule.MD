### Advanced Node.js Modules
#### 进阶 Node.js 模块

在完成这部分阅读后，你将能够描述 Node.js 中的三种模块类型，并能够解释几个核心模块的用途。

**库**（Libraries）在 Node.js 中与**模块**（Modules）是同一个概念。库包含已经开发好的代码，可以在应用程序的各个部分重复使用。Node.js 中有三种类型的模块：核心模块（core modules）、本地模块（local modules）和第三方模块（third-party modules）。

1. **核心模块**：
   - 核心模块构成了 Node.js 的最小库。它们包含开发 Node.js 应用所需的最小功能。
   
2. **本地模块**：
   - 本地模块是由你和开发团队编写的模块，作为构建 Node.js 应用的一部分。
   
3. **第三方模块**：
   - 第三方模块由 Node.js 社区创建并在线提供。这些库可以根据它们的许可证使用。许多第三方模块要么属于公共领域，不需要许可证，要么是开源的。开源资源通常受 "copyleft" 许可证的约束，允许开发人员使用和修改代码，但要求开发人员在相同的许可证下共享他们的工作。

### 核心模块：
核心模块是 Node.js 中最重要的一部分，包括以下几个模块：
- **http**: 提供用于通过 HTTP 传输数据的方法。
- **fs**: 用于与文件系统交互。
- **os**: 提供与操作系统交互的方法。
- **path**: 用于处理和操作文件路径。
- **util**: 提供实用工具函数，通常用于调试和弃用函数。
- **url**: 将 URL 拆分成可读的部分。
- **querystring**: 提供解析 URL 查询字符串的方法。

#### 核心模块使用示例：
1. **http 模块**：用于创建服务器。
   ```javascript
   let http = require('http');
   http.createServer(function (req, res) {
       res.write('hello from server');
       res.end();
   }).listen(6000); // 监听6000端口的请求
   ```

2. **fs 模块**：与文件系统交互，异步读取文件。
   ```javascript
   const fs = require('fs');
   fs.readFile('sample.txt', 'utf8', (err, data) => {
       if (err) {
           console.error(err);
           return;
       }
       console.log(data); // 输出文件内容
   });
   ```

   **fs 模块**还可以同步读取文件：
   ```javascript
   const fs = require('fs');
   const data = fs.readFileSync('/content.md', 'utf8');
   console.log(data);
   ```

3. **os 模块**：用于获取操作系统信息。
   ```javascript
   let os = require('os');
   console.log("操作系统平台: " + os.platform());
   console.log("操作系统架构: " + os.arch());
   ```

4. **path 模块**：处理文件路径。
   ```javascript
   const path = require('path');
   let result = path.basename('/content/index/home.html');
   console.log(result); // 输出 'home.html'
   ```

5. **util 模块**：用于格式化调试信息。
   ```javascript
   let util = require('util');
   let str = '循环执行了 %d 次。';
   for (let i = 1; i <= 10; i++) {
       console.log(util.format(str, i)); // 格式化并输出
   }
   ```

6. **url 模块**：解析 URL 并获取查询参数。
   ```javascript
   const url = require('url');
   let webAddress = 'http://localhost:2000/index.html?lastName=Kent&firstName=Clark';
   let qry = url.parse(webAddress, true);
   console.log(qry.query.firstName); // 输出 'Clark'
   ```

7. **querystring 模块**：解析 URL 查询字符串。
   ```javascript
   let qry = require('querystring');
   let qryParams = qry.parse('lastName=Kent&firstName=Clark');
   console.log(qryParams.firstName); // 输出 'Clark'
   ```

### 第三方模块：
除了核心模块，Node.js 社区也提供了许多第三方模块，例如：
- **AsyncJS**：用于异步编程的实用工具库。
- **Axios**：用于发送 HTTP 请求的库。
- **Express**：用于构建服务器和处理 HTTP 请求的 Web 框架。

这些第三方模块极大地扩展了 Node.js 的功能，并将在后续课程中进一步讨论。

## 总结：
在 Node.js 中，模块分为核心模块、本地模块和第三方模块。核心模块是 Node.js 自带的，包含开发 Node.js 应用的基本功能；本地模块是开发人员编写的；第三方模块是社区贡献的库，通常是开源的。

常用的核心模块包括 `http`, `fs`, `os`, `path`, `util`, `url`, 和 `querystring`，它们分别用于网络通信、文件系统操作、操作系统信息获取、路径操作、调试、URL解析等。

通过 `require()` 函数，你可以导入这些模块并使用它们的功能。第三方模块可以通过 npm 安装并在项目中使用。