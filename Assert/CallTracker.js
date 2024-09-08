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