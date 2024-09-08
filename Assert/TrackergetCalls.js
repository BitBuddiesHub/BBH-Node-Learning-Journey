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