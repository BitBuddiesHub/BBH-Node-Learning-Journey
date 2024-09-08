`package.json` 是 Node.js 项目中的核心文件，通常被称为**模块清单**（module manifest）。每个 Node.js 包都会包含一个 `package.json` 文件，该文件描述了有关此模块的详细信息。

```json
{
   "name" : "mod_today",
   "version" : "1.0.0",
   "main" : "./lib/today",
   "license" : "Apache-2.0"
}
```

根据示例，`package.json` 文件包括以下关键字段：

1. **name**: 模块的名称，示例中为 `"mod_today"`。该字段标识包的名称，并且在发布到 npm（Node Package Manager）时必须唯一。
   
2. **version**: 版本号，示例中为 `"1.0.0"`。该字段遵循语义化版本规则（SemVer），帮助管理不同版本之间的差异。

3. **main**: 包的入口文件，示例中为 `"./lib/today"`。这个路径指向包的主文件，当模块被 `require` 或 `import` 时，会首先加载这个文件。

4. **license**: 模块的开源协议，示例中为 `"Apache-2.0"`。该字段说明了该模块的许可协议，决定了其他人如何使用和分发此模块。

`package.json` 文件的作用是为开发者提供一个统一的地方来管理模块的元数据、依赖关系和脚本等。它是 Node.js 项目中不可或缺的一部分，帮助项目更好地管理版本、依赖和其他配置。

### 导入 Node.js Modules

在 Node.js 中，**`require`** 函数用于导入模块。`require` 是 Node.js 中的一个内置函数，专门用于引入外部模块，无论是内置模块、第三方库还是用户自定义的本地模块。

#### 关键要点：
1. **`require` 的基本用法**：
   - 通过 `require` 函数可以引入其他文件或模块，并返回一个对象，该对象代表模块中导出的内容。
   - 示例：
     ```javascript
     let today = require('./today');
     ```
   这行代码的意思是，导入位于当前目录下的 `today.js` 模块，并将其赋值给变量 `today`。

2. **`.js` 文件扩展名的默认行为**：
   - 在使用 `require` 函数导入模块时，Node.js 假设文件扩展名是 `.js`，因此你可以省略扩展名。
   - 例如，`require('./today')` 实际上指向的是 `today.js` 文件。

3. **`require` 创建模块对象**：
   - `require` 函数返回的对象代表被导入的模块。通过 `module.exports` 或 `exports` 导出的内容会作为这个对象的一部分，从而可以在另一个文件中使用。

#### 总结：
`require` 是 Node.js 中模块系统的核心部分，允许开发者轻松地加载外部文件并复用代码。当你使用 `require('./module')` 时，Node.js 自动假设扩展名为 `.js`，并返回该模块的导出对象，使得模块化开发成为可能。

使用 `require` 函数来导入 Node.js 模块，具体分为两种情况：

### 第一种情况：导入单个脚本文件
- 如果需要导入一个 Node.js 模块，并且该模块是单个脚本文件，可以使用 `require` 函数，并提供该脚本文件的相对路径。
- 示例：
  ```javascript
  let today = require('./today');
  ```
  这个例子中，`require` 导入了与当前文件同目录下的 `today.js` 模块。`require` 假设文件的扩展名为 `.js`，因此可以省略扩展名。

### 第二种情况：导入位于子目录中的模块
- 如果模块是位于子目录中的，并且目录中包含一个入口文件（如 `index.js`），可以使用 `require` 函数，通过提供子目录名称来导入模块。
- 示例：
  ```javascript
  let mod_today = require('./mod_today');
  ```
  这里，`require` 会默认寻找子目录 `mod_today` 下的 `index.js` 文件，并导入该文件作为模块的入口。这种方法适用于包含多个文件的模块组织方式。

### 总结：
- `require('./file')` 用于导入同目录下的 JavaScript 文件。
- `require('./directory')` 用于导入子目录中的模块，`require` 会自动加载该目录下的 `index.js` 文件作为入口点。

这些例子展示了 `require` 如何通过相对路径导入 Node.js 中的模块，无论是单文件模块还是子目录模块，都是 Node.js 模块化系统的重要组成部分。

如果你不想导入默认的 `index.js` 文件，而是想导入子目录中的其他特定文件，你可以在 `require` 函数中明确指定文件的路径，而不是仅仅提供目录名。

### 如何导入特定文件：
在 `require` 路径中，直接指定你想要导入的具体文件，而不是依赖于默认的 `index.js`。例如，如果 `mod_today` 目录下有一个名为 `utils.js` 的文件，并且你想要导入这个文件，而不是 `index.js`，你可以这样写：

```javascript
let utils = require('./mod_today/utils');
```

### 示例说明：

1. **文件结构：**
   ```
   project/
   ├── hello.js
   └── mod_today/
       ├── index.js
       ├── utils.js
   ```

2. **在 `hello.js` 中导入 `utils.js`：**
   ```javascript
   let utils = require('./mod_today/utils');
   ```

   在这个例子中，`require('./mod_today/utils')` 会直接加载 `mod_today` 目录下的 `utils.js` 文件，而不是默认的 `index.js` 文件。

### 总结：
- 如果你只写 `require('./mod_today')`，Node.js 会默认加载 `mod_today` 目录下的 `index.js` 文件。
- 如果你想导入 `mod_today` 目录下的其他文件，例如 `utils.js`，你需要在 `require` 中指定相对路径：`require('./mod_today/utils')`。

通过这种方式，你可以灵活地导入子目录中的任何特定文件，而不仅仅是 `index.js`。

## 隐式的 `exports` 对象

每个 Node.js 模块都有一个隐式的 `exports` 对象，允许开发者将函数或变量导出，使得其他模块可以通过 `require` 函数访问这些导出的内容。

### 代码解析：

```javascript
let date = new Date(); // 创建一个当前日期的对象

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // 定义一个包含星期的数组

exports.dayOfWeek = function () { // 将匿名函数赋值给 exports.dayOfWeek，这个函数会被导出
    return days[date.getDay() - 1]; // 使用 date.getDay() 获取当前星期几，返回相应的字符串
};
```

### 关键点总结：
1. **`exports` 对象**：
   - 每个 Node.js 模块默认都有一个 `exports` 对象，可以将属性或函数附加到 `exports` 上，来导出这些内容。
   - 通过 `exports.dayOfWeek`，我们可以将 `dayOfWeek` 函数导出，其他模块可以通过 `require` 使用这个函数。

2. **`dayOfWeek` 函数**：
   - 这里 `dayOfWeek` 是一个**匿名函数**，它没有名字，直接赋值给 `exports.dayOfWeek`。
   - 该函数返回当前星期几的字符串形式（例如 Monday、Tuesday 等）。它通过 `date.getDay()` 函数来获取当前的星期几（`getDay()` 返回的值是 0 到 6，其中 0 表示周日），并从 `days` 数组中提取相应的值。

### 是不是匿名函数？
是的，`dayOfWeek` 是一个**匿名函数**，因为它没有显式的函数名，直接通过 `function ()` 形式定义，并且赋值给了 `exports.dayOfWeek` 属性。

### 这是什么？
- 这个代码片段定义了一个可以返回当前星期几的模块。通过将 `dayOfWeek` 函数导出，其他模块可以通过 `require` 导入此函数，调用它来获取当前的星期几。
- 例如，其他文件可以这样使用：
  ```javascript
  const mod = require('./index');
  console.log(mod.dayOfWeek()); // 输出当前星期几，例如 'Monday'
  ```

## 访问已导出的模块属性

### 导入模块
1. **模块的导入**：
   - 当你使用 `require` 函数导入一个 Node.js 模块时，`require` 返回一个 JavaScript 对象，这个对象代表该模块的一个实例。
   - 示例代码：
     ```javascript
     let today = require('./mod_today');
     ```
     在这个例子中，`require('./mod_today')` 导入 `mod_today` 模块，并将返回的模块对象赋值给 `today` 变量。`today` 现在就成为了该模块的实例，你可以通过它访问模块中导出的内容。

### 访问导出的属性和方法
1. **访问模块的属性**：
   - 当导入一个模块之后，你可以通过模块实例来访问模块中导出的属性或方法。
   - 示例中，`today.dayOfWeek` 是 `mod_today` 模块中导出的 `dayOfWeek` 函数，你可以通过 `today.dayOfWeek()` 调用该函数并获取当前的星期几。
   - 示例代码：
     ```javascript
     console.log("Happy %s!", today.dayOfWeek());
     ```
     在这个例子中，`today.dayOfWeek()` 调用的是 `mod_today` 模块中导出的 `dayOfWeek` 函数，函数返回一个字符串表示今天的星期几，并将其嵌入到 `console.log` 输出的字符串中。

### 总结：
1. **模块实例**：使用 `require` 导入模块后，返回的对象代表模块的一个实例，你可以通过该实例访问模块中导出的函数和属性。
2. **访问导出属性**：你可以通过对象点语法（例如 `today.dayOfWeek`）来调用模块中导出的函数或属性，进而在你的应用程序中使用这些功能。