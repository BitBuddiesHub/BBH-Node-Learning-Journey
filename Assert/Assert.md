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

### `tracker.reset([fn])`

**引入版本**: v18.8.0, v16.18.0

- `fn <Function>`：要重置的跟踪函数。

该方法用于重置调用跟踪器的调用记录。如果传入了一个跟踪的函数作为参数，将只重置该函数的调用记录。如果不传入任何参数，则会重置所有跟踪函数的调用记录。

```javascript
const assert = require('node:assert');

const tracker = new assert.CallTracker();

function func() {}

// 将 func 包装为可跟踪的函数
const callsfunc = tracker.calls(func);

callsfunc();
// Tracker 已调用一次
assert.strictEqual(tracker.getCalls(callsfunc).length, 1);

// 重置函数调用记录
tracker.reset(callsfunc);
assert.strictEqual(tracker.getCalls(callsfunc).length, 0);
```

### `tracker.verify()`

**引入版本**: v14.2.0, v12.19.0

该方法会遍历通过 `tracker.calls()` 注册的函数列表，并检查它们是否按预期的次数被调用。如果有函数没有被调用指定的次数，`tracker.verify()` 将抛出错误。

```javascript
const assert = require('node:assert');

// 创建 CallTracker 实例
const tracker = new assert.CallTracker();

function func() {}

// 包装 func() 函数，要求调用 2 次
const callsfunc = tracker.calls(func, 2);

callsfunc();

// 因为 callsfunc() 只被调用了一次，调用 tracker.verify() 时将抛出错误
tracker.verify();
```

### `assert(value[, message])`

**引入版本**: v0.5.9

- `value <any>`：要检查的输入值，要求它为真值。
- `message <string> | <Error>`：断言失败时的错误消息或错误对象。

这是 `assert.ok()` 的别名，用于检查传入的值是否为真值。

### `assert.deepEqual(actual, expected[, message])`

**历史背景**：
- `actual <any>`：实际值。
- `expected <any>`：预期值。
- `message <string> | <Error>`：可选的错误消息。

#### 严格断言模式：
这是 `assert.deepStrictEqual()` 的别名。

#### 传统断言模式：
**稳定性**: `3 - Legacy`（建议使用 `assert.deepStrictEqual()`）。

`assert.deepEqual()` 测试实际值和预期值之间的深度相等性。然而，它可能会有令人意外的行为，因此建议使用 `assert.deepStrictEqual()`。

#### 深度相等的定义：

- 枚举的 "own" 属性会被递归评估。
- 原始值使用 `==` 比较（除了 `NaN` 例外，两个 `NaN` 被视为相等）。
- 对象的类型标签应相同。
- 只考虑可枚举的 "own" 属性。
- 错误的名称、消息、原因和错误对象始终会被比较，即使这些属性不可枚举。
- 对象包装器会同时作为对象和未包装的值进行比较。
- 对象的属性比较不考虑顺序。
- `Map` 和 `Set` 的键值项比较不考虑顺序。
- 遇到循环引用时，递归比较会停止。
- 不会比较对象的 `[[Prototype]]`。
- `Symbol` 属性不被比较。
- `WeakMap` 和 `WeakSet` 的比较不依赖于它们的值。
- `RegExp` 的 `lastIndex`、`flags` 和 `source` 属性始终会被比较。

#### 示例：

```javascript
const assert = require('node:assert');

// 警告：此处不会抛出 AssertionError！
assert.deepEqual('+00000000', false);
```

由于 `assert.deepEqual()` 在传统模式下使用 `==` 操作符进行比较，`'+00000000'` 和 `false` 被认为是相等的，因此不会抛出错误。

### 示例：深度相等性比较

```javascript
const assert = require('node:assert');

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.deepEqual(obj1, obj1);
// OK

// b 的值不同：
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// OK

// 原型属性被忽略：
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } deepEqual {}
```

#### 错误消息：
如果比较不相等，`assert.deepEqual()` 会抛出 `AssertionError`，并带有错误消息。如果提供了 `message` 参数，则使用该参数作为错误消息；如果未定义 `message`，将分配一个默认错误消息。如果 `message` 是一个 `Error` 实例，则会抛出该错误而非 `AssertionError`。


### `assert.deepStrictEqual(actual, expected[, message])`

#### 历史背景
- `actual <any>`: 实际值。
- `expected <any>`: 预期值。
- `message <string> | <Error>`: 可选的错误消息。

`assert.deepStrictEqual()` 用于测试实际值与预期值之间的深度相等性。"深度相等性" 表示会递归评估对象的枚举 "own" 属性，遵循以下规则。

#### 比较细节：
1. **原始值** 使用 `Object.is()` 进行比较。
2. **对象的类型标签** 必须相同。
3. **对象的 `[[Prototype]]`** 使用 `===` 操作符进行比较。
4. 只比较**可枚举的 "own" 属性**。
5. **错误对象的名称、消息、原因** 总是进行比较，即使这些属性不可枚举。
6. **可枚举的 `Symbol` 属性** 也会被比较。
7. **对象包装器** 会同时作为对象和未包装的值进行比较。
8. **对象属性** 无序比较。
9. **Map 键和值、Set 项** 无序比较。
10. 当**循环引用**出现在两侧或比较时递归遇到差异，递归停止。
11. **WeakMap 和 WeakSet** 的比较不依赖于它们的值。
12. **RegExp 的 `lastIndex`、`flags` 和 `source`** 始终被比较，即使它们不可枚举。

#### 示例：深度严格相等比较

```javascript
const assert = require('node:assert/strict');

// 该断言失败，因为 1 !== '1'（严格比较时类型不同）
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   {
// +   a: 1
// -   a: '1'
//   }

// 以下对象没有 "own" 属性
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// 不同的 [[Prototype]]:
assert.deepStrictEqual(object, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + {}
// - Date {}

// 类型标签不同：
assert.deepStrictEqual(date, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

// NaN 与 NaN 被视为相等：
assert.deepStrictEqual(NaN, NaN);
// OK 因为 Object.is(NaN, NaN) 返回 true。

// 数值不同：
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + [Number: 1]
// - [Number: 2]

// 字符串对象与对象包装的字符串相等：
assert.deepStrictEqual(new String('foo'), Object('foo'));
// OK 因为对象解包后，字符串相同。

assert.deepStrictEqual(-0, -0);
// OK

// 不同的 0：
assert.deepStrictEqual(0, -0);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();

// 相同的 Symbol 属性：
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// OK

// 不同的 Symbol 属性：
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
//
// {
//   [Symbol()]: 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, {}]]);
const weakMap3 = new WeakMap();
weakMap3.unequal = true;

// WeakMap 比较无视内容：
assert.deepStrictEqual(weakMap1, weakMap2);
// OK, 因为无法比较 WeakMap 的条目。

// 失败，因为 weakMap3 包含一个 weakMap1 没有的属性：
assert.deepStrictEqual(weakMap1, weakMap3);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   WeakMap {
// +   [items unknown]
// -   [items unknown],
// -   unequal: true
//   }
```

#### 错误消息：
如果实际值和预期值不相等，则会抛出 `AssertionError`，其 `message` 属性会被设置为传入的 `message` 参数值。如果 `message` 参数未定义，则会使用默认的错误消息。如果 `message` 参数是 `Error` 实例，则会抛出该错误，而不是 `AssertionError`。


### 例子讲解：

1. **对象和原始值的严格比较**：在严格模式下，`assert.deepStrictEqual()` 使用 `Object.is()` 来比较原始值（如数字、字符串）。它确保两个对象的结构、类型和原始值都必须严格相等。
   
2. **循环引用和 Symbol 比较**：`assert.deepStrictEqual()` 也会考虑循环引用的停止条件，并且会比较 Symbol 属性。

3. **WeakMap 和 WeakSet 的特殊处理**：WeakMap 和 WeakSet 的比较不依赖于它们的内容，因为这些对象的条目是不可比较的。只会比较它们的附加属性。

### 注意事项：
- 当使用 `assert.deepStrictEqual()` 时，比较的方式是严格的，这意味着即使是类型上的微小差异（如 `1` 和 `'1'`）也会导致断言失败。

### `assert.doesNotMatch(string, regexp[, message])`

#### 历史背景
- **引入版本**: v13.6.0, v12.16.0
- **稳定版本**: 自 v16.0.0 起不再是实验性 API。

#### 参数：
- `string <string>`：要进行匹配的字符串。
- `regexp <RegExp>`：用于匹配的正则表达式。
- `message <string> | <Error>`：可选的错误消息或错误对象。

`assert.doesNotMatch()` 断言输入的字符串**不应**匹配提供的正则表达式。如果字符串与正则表达式匹配或字符串不是 `string` 类型，则会抛出 `AssertionError`。

#### 示例：

```javascript
const assert = require('node:assert/strict');

// 断言失败，因为字符串 "I will fail" 与正则表达式 /fail/ 匹配
assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: The input was expected to not match the ...

// 断言失败，因为输入的值 123 不是字符串类型
assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

// 断言通过，因为字符串 "I will pass" 不匹配正则表达式 /different/
assert.doesNotMatch('I will pass', /different/);
// OK
```

#### 错误消息：
- 如果输入的字符串与正则表达式匹配，或者 `string` 参数不是字符串类型，`assert.doesNotMatch()` 会抛出 `AssertionError`。错误消息会根据传入的 `message` 参数进行设置。如果 `message` 未定义，将使用默认错误消息。如果 `message` 是 `Error` 实例，则抛出该错误而不是 `AssertionError`。

---

### `assert.doesNotReject(asyncFn[, error][, message])`

#### 历史背景
- **引入版本**: v10.0.0

#### 参数：
- `asyncFn <Function> | <Promise>`：一个异步函数或 Promise 对象。
- `error <RegExp> | <Function>`：可选。期望捕获的错误类型，可以是正则表达式或函数。
- `message <string>`：可选的错误消息。

`assert.doesNotReject()` 用于断言异步操作的 Promise **不应该**被拒绝。如果 `asyncFn` 是一个函数，则立即调用该函数并等待返回的 Promise 完成，并验证该 Promise 没有被拒绝。

#### 示例：

```javascript
const assert = require('node:assert/strict');

// 这个例子将不会抛出 AssertionError，因为期望的错误类型不匹配
(async () => {
  await assert.doesNotReject(
    async () => {
      throw new TypeError('Wrong value'); // 实际抛出 TypeError
    },
    SyntaxError, // 期望的错误类型是 SyntaxError
  );
})();
```

```javascript
const assert = require('node:assert/strict');

// 该例子验证 Promise 不应该被拒绝
assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // 这个代码块不会执行，因为 Promise 被拒绝了
  });
```

#### 行为解释：
- 如果 `asyncFn` 是一个函数并同步抛出错误，`assert.doesNotReject()` 将返回一个被拒绝的 Promise，带有该错误。
- 如果 `asyncFn` 不返回 Promise，`assert.doesNotReject()` 会返回一个被拒绝的 Promise，错误码为 `ERR_INVALID_RETURN_VALUE`。
- 在这两种情况下，错误处理程序将被跳过。

#### 注意事项：
使用 `assert.doesNotReject()` 并不总是非常有用，因为它只是捕获一个拒绝并再次抛出。因此，建议在不应该拒绝的代码路径旁添加注释，同时保持错误信息的清晰表达。 

#### 错误类型：
`error` 参数可以是一个类、正则表达式或验证函数。详见 `assert.throws()` 的详细信息。除了异步操作外，`assert.doesNotReject()` 的行为与 `assert.doesNotThrow()` 一致。

### `assert.doesNotThrow(fn[, error][, message])`

#### 历史背景
- `fn <Function>`：要调用的函数。
- `error <RegExp> | <Function>`：可选。期望捕获的错误类型，可以是正则表达式或函数。
- `message <string>`：可选的错误消息。

`assert.doesNotThrow()` 断言函数 `fn` **不应该**抛出错误。

#### 使用提示：
实际上，使用 `assert.doesNotThrow()` 没有太大意义，因为捕获错误并重新抛出没有什么好处。更好的做法是在不应该抛出错误的代码旁添加注释，同时确保错误信息足够清晰和有表达力。

#### 行为说明：
- 当 `assert.doesNotThrow()` 被调用时，它会立即执行传入的 `fn` 函数。
- 如果函数抛出错误，并且该错误与 `error` 参数指定的类型相同，则抛出 `AssertionError`。如果错误类型不同，或者 `error` 参数未定义，则会将错误直接传递给调用者。
- `error` 参数可以是类、正则表达式或验证函数。更多信息可以参考 `assert.throws()`。

#### 示例：

```javascript
const assert = require('node:assert/strict');

// 这段代码会抛出 TypeError，因为没有匹配到错误类型
assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

```javascript
const assert = require('node:assert/strict');

// 这段代码会抛出 AssertionError，并显示 "Got unwanted exception..." 的消息
assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  TypeError,
);
```

#### 自定义错误消息：
如果抛出 `AssertionError` 并且提供了 `message` 参数，该消息会被附加到 `AssertionError` 的错误信息中：

```javascript
const assert = require('node:assert/strict');

// 自定义错误消息 'Whoops' 会被附加到 AssertionError 中
assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops',
);
// Throws: AssertionError: Got unwanted exception: Whoops
```

---

### `assert.equal(actual, expected[, message])`

#### 历史背景
- `actual <any>`：实际值。
- `expected <any>`：预期值。
- `message <string> | <Error>`：可选的错误消息。

#### 严格断言模式：
`assert.equal()` 是 `assert.strictEqual()` 的别名。

#### 传统断言模式：
**稳定性**: `3 - Legacy`（建议使用 `assert.strictEqual()`）。

`assert.equal()` 使用 `==` 操作符来测试 `actual` 和 `expected` 值之间的浅层强制相等性。特别地，`NaN` 会被特殊处理，当两边都是 `NaN` 时，它们被认为是相等的。

#### 示例：

```javascript
const assert = require('node:assert');

// 强制相等，1 == 1
assert.equal(1, 1);
// OK

// 强制类型转换，1 == '1'
assert.equal(1, '1');
// OK

// NaN 被视为相等
assert.equal(NaN, NaN);
// OK

// 断言失败，1 != 2
assert.equal(1, 2);
// AssertionError: 1 == 2

// 断言失败，对象不相等
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
```

#### 错误消息：
如果 `actual` 和 `expected` 的值不相等，`assert.equal()` 会抛出 `AssertionError`。如果传入了 `message` 参数，该消息会被附加到错误消息中。如果 `message` 未定义，则会使用默认错误消息。如果 `message` 是 `Error` 实例，则会抛出该错误，而不是 `AssertionError`。

