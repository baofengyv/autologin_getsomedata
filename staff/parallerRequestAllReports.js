
var async = require("async");
var request = require('request');

var CONSTANT = require('./CONSTANT')

var count = 0;

module.exports = function (cookie, nameReportIDs, next) {

    // var data = [
    //     { name: "李", reportId: 12333 },
    //     { name: "张", reportId: 12317 },
    //     { name: "金", reportId: 12319 }
    // ];

    // paralle 并发获取所有人的报告
    async.map(nameReportIDs, function (item, callback) {

        var options = {
            method: 'GET',
            url: CONSTANT.domain + '/CRFData/ExportHTML/' + item.reportId,
            headers: {
                cookie: cookie
            },
        };

        request(options, function (error, response, html) {

            console.log(++count);

            callback(
                error,
                {
                    name: item.name,
                    html: html
                }
            );
        });

    }, function (err, reports) {
        next(err, reports);
    });
};