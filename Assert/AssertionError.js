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