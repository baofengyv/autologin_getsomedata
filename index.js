
var async = require("async");


var doLogin = require('./staff/doLogin');
var getReportList = require('./staff/getReportList');
var processData = require('./staff/processData');
var paralleRequestAllReports = require('./staff/parallerRequestAllReports')

// Token
var cookieToken = {};

async.waterfall([
    (next) => {
        doLogin(next);
    },
    (cookie, next) => {
        // 将cookie保存下来
        cookieToken = cookie;

        // 获取昨天的报告列表
        getReportList(cookieToken, next);
    },
    (reportList, next) => {
        // 从list中提取姓名和报告id
        var nameReportIDs = processData.getNameIds(reportList);

        next(null, nameReportIDs);
    },
    (nameReportIDs, next) => {

        // paralle 并发获取所有人的报告
        paralleRequestAllReports(cookieToken, nameReportIDs, next);
    },
    (nameReport, next) => {

        // 从html中提取信息
        next(null, processData.parseHTMLInfo(nameReport));
    }
], (err, result) => {
    processData.printTable(result);
});
