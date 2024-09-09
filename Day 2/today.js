// 从模块中导出一个名为 'getDate' 的函数
module.exports.getDate = function getDate() {
    // 获取当前的日期和时间，时区为 "Australia/Brisbane"
    let aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
    return aestTime; // 返回格式化的日期和时间
};