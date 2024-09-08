# 严格断言模式（Strict Assertion Mode）

在严格断言模式下，非严格方法的行为与其对应的严格方法一致。例如，`assert.deepEqual()` 的行为将类似于 `assert.deepStrictEqual()`。

在严格断言模式下，针对对象的错误消息会显示差异（diff）。而在传统断言模式下，针对对象的错误消息通常会显示对象内容，且内容可能会被截断。

## 如何启用严格断言模式

可以通过以下方式启用严格断言模式：

```javascript
const assert = require('node:assert').strict;
```

或

```javascript
const assert = require('node:assert/strict');
```

## 示例：错误消息中的差异显示

```javascript
const assert = require('node:assert/strict');

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected ... Lines skipped
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
```


> 在这段代码中，`assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);` 抛出了 
> `AssertionError`，原因是 `assert.deepEqual()` 使用了严格模式下的比较逻辑，即 `assert.
> deepStrictEqual()`。让我们详细讲解为什么会抛出错误：
> 
> ### `assert.deepEqual()` 的行为
> 在严格断言模式下，`assert.deepEqual()` 的行为和 `assert.deepStrictEqual()` 是相同的，这意味着它会
> 进行**严格深度比较**，要求比较的值在类型和值上都必须相等。如果类型或值不匹配，就会抛出 > `AssertionError`。
> 
> ### 对比输入：
> 我们传入的两个数组如下：
> 1. **实际值（actual）**: `[[[1, 2, 3]], 4, 5]`
> 2. **预期值（expected）**: `[[[1, 2, '3']], 4, 5]`
> 
> #### 第一层：
> - `[[1, 2, 3]]` 和 `[[1, 2, '3']]` 是嵌套的数组。为了进行深度比较，`assert.deepStrictEqual()` 会
> 逐层递归比较每个元素。
> 
> #### 第二层：
> - 在实际值中，数组 `[[1, 2, 3]]` 中的元素 `3` 是数字。
> - 在预期值中，数组 `[[1, 2, '3']]` 中的元素 `'3'` 是字符串。
> 
> ### 为什么会抛出 `AssertionError`
> 在 JavaScript 中，`3`（数字）和 `'3'`（字符串）是不同类型的值。在严格比较模式下，即使用 `===` 进行
> 比较，数字 `3` 和字符串 `'3'` 是**不相等的**，因为它们的类型不同。因此，当 `assert.deepEqual()` 递
> 归比较到这一级时，它检测到 `3` 和 `'3'` 不相等，进而抛出 `AssertionError`。
> 
> ### 错误消息中的差异：
> 错误消息提供了实际值和预期值的差异：
> - `+ 3` 表示实际值是数字 `3`。
> - `- '3'` 表示预期值是字符串 `'3'`。
> 
> ### 总结：
> - **报错原因**：`assert.deepEqual()` 在严格模式下要求进行深度的严格比较，而数字 `3` 和字符串 > `'3'` 是不同类型的值，因此不满足严格相等的条件。
> - **解决方法**：如果你希望忽略类型差异，可以使用传统的 `assert` 模式（即 `require('node:assert')
> `）或确保实际值和预期值的类型一致。


## 禁用颜色显示

如果您不希望在错误消息中使用颜色，可以使用以下环境变量禁用颜色显示。这也会禁用REPL中的颜色显示。

```bash
NO_COLOR=1
NODE_DISABLE_COLORS=1
```

有关终端环境中颜色支持的更多信息，请查阅 `tty.getColorDepth()` 文档。

# 传统断言模式（Legacy Assertion Mode）

在传统断言模式下，`assert.deepEqual()`、`assert.equal()`、`assert.notDeepEqual()` 和 `assert.notEqual()` 方法使用 `==` 操作符进行比较。

## 如何启用传统断言模式

可以通过以下方式启用传统断言模式：

```javascript
const assert = require('node:assert');
```

## 传统模式中的潜在问题

使用传统断言模式时，某些结果可能会令人惊讶，特别是在使用 `assert.deepEqual()` 时：

```javascript
// 警告：在传统断言模式下，这不会抛出 AssertionError 异常！
assert.deepEqual(/a/gi, new Date());
```

### 例子解释

1. **严格模式的行为**：
   - `assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);` 在严格模式下会抛出 `AssertionError`，并显示两者的差异，因为数字 `3` 和字符串 `'3'` 在严格比较下不相等。

2. **传统模式的行为**：
   - 在传统模式下，`assert.deepEqual(/a/gi, new Date());` 不会抛出 `AssertionError`，即使正则表达式和日期对象显然不同。这是因为传统模式使用非严格的 `==` 操作符进行比较，而这种情况下 `==` 可能不会区分复杂对象之间的差异。

# Class: assert.AssertionError

## 继承自: `<errors.Error>`

`AssertionError` 类是一个 `Error` 类的子类，用于指示断言失败。所有由 `node:assert` 模块抛出的错误实例都是 `AssertionError` 类的实例。

### `new assert.AssertionError(options)`

**引入版本**: v0.1.21

创建一个新的 `AssertionError` 实例，常用于表示断言失败。其构造函数接受一个 `options` 对象，用于配置生成的错误实例。

#### 参数说明：

- `options <Object>`：包含多个配置选项。
  - `message <string>`：错误消息。如果提供，错误实例的消息会设置为该值。
  - `actual <any>`：错误实例的 `actual` 属性，表示实际的值。
  - `expected <any>`：错误实例的 `expected` 属性，表示预期的值。
  - `operator <string>`：错误实例的 `operator` 属性，表示使用的运算符。
  - `stackStartFn <Function>`：如果提供，生成的堆栈跟踪将忽略该函数之前的堆栈帧。

#### 详细解释：

- `AssertionError` 是一个 `Error` 子类，用于在断言失败时抛出错误。
- 它包含所有 `Error` 类的内置属性（例如 `message` 和 `name`），并添加了以下额外属性：
  - `actual <any>`：在断言方法（如 `assert.strictEqual()`）中设置为实际的值。
  - `expected <any>`：在断言方法中设置为预期的值。
  - `generatedMessage <boolean>`：指示消息是自动生成的 (`true`)，还是由用户提供的 (`false`)。
  - `code <string>`：始终为 `'ERR_ASSERTION'`，表明错误是一个断言错误。
  - `operator <string>`：设置为传入的运算符值，用于描述断言操作。
  
#### 示例：创建一个 `AssertionError` 实例并进行断言

下面的示例展示了如何生成一个 `AssertionError`，以及如何检查断言失败时抛出的错误信息。

```javascript
const assert = require('node:assert');

// 生成一个 AssertionError 实例，用于后续比较错误信息
const { message } = new assert.AssertionError({
  actual: 1, // 实际值
  expected: 2, // 预期值
  operator: 'strictEqual', // 运算符，表示使用严格相等比较
});

// 验证错误输出
try {
  // 此处断言 `1 === 2` 会失败，触发 AssertionError
  assert.strictEqual(1, 2);
} catch (err) {
  // 检查抛出的错误是否为 AssertionError 实例
  assert(err instanceof assert.AssertionError);

  // 验证错误消息是否与生成的 AssertionError 的消息一致
  assert.strictEqual(err.message, message);

  // 验证错误名称为 "AssertionError"
  assert.strictEqual(err.name, 'AssertionError');

  // 验证错误的实际值为 1
  assert.strictEqual(err.actual, 1);

  // 验证错误的预期值为 2
  assert.strictEqual(err.expected, 2);

  // 验证错误码为 "ERR_ASSERTION"
  assert.strictEqual(err.code, 'ERR_ASSERTION');

  // 验证运算符为 "strictEqual"
  assert.strictEqual(err.operator, 'strictEqual');

  // 验证错误消息是否为自动生成的
  assert.strictEqual(err.generatedMessage, true);
}
```

### 例子讲解：

1. **创建 `AssertionError` 实例**：
   使用 `assert.AssertionError` 创建一个错误实例。这里我们指定了 `actual: 1`，`expected: 2`，以及 `operator: 'strictEqual'`。这个实例生成的错误消息将用于后续的错误比较。

2. **断言失败场景**：
   `assert.strictEqual(1, 2);` 断言 `1` 和 `2` 严格相等（使用 `===` 运算符），这必然失败，会抛出 `AssertionError`。我们在 `catch` 块中捕获了这个错误。

3. **错误验证**：
   在 `catch` 块中，我们验证了以下几点：
   - 错误是 `assert.AssertionError` 的实例。
   - 错误的消息与我们创建的 `AssertionError` 实例的消息相同。
   - 错误的名称是 `'AssertionError'`。
   - 错误的实际值 (`actual`) 是 `1`，预期值 (`expected`) 是 `2`。
   - 错误码 (`code`) 是 `'ERR_ASSERTION'`，表示这是一个断言错误。
   - 运算符是 `'strictEqual'`，与我们在创建时指定的运算符一致。
   - 错误消息是自动生成的，表明 `generatedMessage` 为 `true`。

### 解释：

- **`AssertionError` 类**：用于表示断言失败的专用错误类，继承了 `Error` 类的所有属性，并额外包含断言相关的详细信息（如 `actual`、`expected` 和 `operator`）。
- **生成错误实例**：在断言中传递实际值、预期值以及运算符，用于创建具有特定信息的错误实例。
- **错误验证**：通过捕获 `AssertionError` 来验证错误信息是否符合预期，并确保断言机制正常工作。

# Class: assert.CallTracker

## 历史背景

**稳定性**: `0 - Deprecated`（已弃用）

该特性已经被弃用，并将在未来版本中被移除。建议使用替代方案，如 `mock` 辅助函数。

### `new assert.CallTracker()`

**引入版本**: v14.2.0, v12.19.0

`CallTracker` 类用于跟踪函数是否被调用了特定的次数。创建一个 `CallTracker` 对象，调用 `tracker.verify()` 可以进行验证。通常的使用模式是在 `process.on('exit')` 事件处理程序中调用 `tracker.verify()` 进行验证。

```javascript
const assert = require('node:assert');
const process = require('node:process');

const tracker = new assert.CallTracker();

function func() {}

// 使用 tracker.calls(func, 1) 包装 func()，此函数必须在 tracker.verify() 之前被调用恰好 1 次。
const callsfunc = tracker.calls(func, 1);

callsfunc();

// 在进程退出时调用 tracker.verify()，验证所有 tracker.calls() 中的函数是否按预期调用了正确次数。
process.on('exit', () => {
  tracker.verify();
});
```

### `tracker.calls([fn][, exact])`

**引入版本**: v14.2.0, v12.19.0

- `fn <Function>`：默认为一个空操作函数（no-op function）。
- `exact <number>`：默认值为 `1`。

返回一个包装了 `fn` 的函数。包装函数必须被调用指定的次数（`exact` 次）。如果在调用 `tracker.verify()` 时，该函数没有被调用指定的次数，则会抛出错误。

```javascript
const assert = require('node:assert');

// 创建 CallTracker 实例
const tracker = new assert.CallTracker();

function func() {}

// 返回包装的 func() 函数，要求在调用 tracker.verify() 之前恰好被调用指定次数
const callsfunc = tracker.calls(func);
```

### `tracker.getCalls(fn)`

**引入版本**: v18.8.0, v16.18.0

- `fn <Function>`：跟踪的函数。

返回一个数组，其中包含跟踪的函数的所有调用信息。

#### 数组内容：
- `thisArg <Object>`：调用函数时的上下文对象。
- `arguments <Array>`：传递给跟踪函数的参数数组。

```javascript
const assert = require('node:assert');

// 创建 CallTracker 实例
const tracker = new assert.CallTracker();

function func() {}
const callsfunc = tracker.calls(func);

// 调用函数并传递参数
callsfunc(1, 2, 3);

// 使用 deepStrictEqual 断言，验证 tracker.getCalls() 返回的调用信息
assert.deepStrictEqual(tracker.getCalls(callsfunc),
                       [{ thisArg: undefined, arguments: [1, 2, 3] }]);
```

### `tracker.report()`

**引入版本**: v14.2.0, v12.19.0

返回一个对象数组，包含有关由 `tracker.calls()` 返回的包装函数的信息。该数组包含未被按预期次数调用的函数的调用次数信息。

#### 对象内容：
- `message <string>`：错误消息。
- `actual <number>`：函数实际被调用的次数。
- `expected <number>`：预期函数应被调用的次数。
- `operator <string>`：包装的函数名。
- `stack <Object>`：调用该函数的堆栈跟踪信息。

```javascript
const assert = require('node:assert');

// 创建 CallTracker 实例
const tracker = new assert.CallTracker();

function func() {}

// 包装 func() 函数，预期调用 2 次
const callsfunc = tracker.calls(func, 2);

// 实际只调用 1 次
callsfunc();

// 调用 tracker.report()，获取未按预期次数调用的函数报告
const report = tracker.report();

console.log(report);
// 输出信息将包含 message、actual、expected 等详细信息
```

### 例子讲解：

1. **CallTracker 用法**：`CallTracker` 可以跟踪函数的调用次数，并在调用 `tracker.verify()` 时验证所有跟踪的函数是否按预期调用。如果没有按预期调用，则抛出错误。
2. **tracker.calls()**：`tracker.calls(fn, exact)` 返回一个包装了 `fn` 的函数，确保该函数被调用 `exact` 次。例如，如果我们设置了 `exact: 1`，函数必须被调用一次，多次或不调用都会导致验证失败。
3. **tracker.getCalls()**：此方法返回每个调用函数时传递的参数以及上下文信息，可以用来检查函数调用是否符合预期。
4. **tracker.report()**：报告提供了详细的函数调用信息，尤其是在函数未按预期调用时，它会生成一个包含调用次数、预期值和实际值的错误报告。

### 注意：
`CallTracker` 类已经被弃用，在未来版本中将被移除，建议尽早迁移到替代方案，如 `mock` 函数或其他测试框架工具。