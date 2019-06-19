'use strict';

var request = require("request");
var CONSTANT = require('./CONSTANT');

module.exports = function (cookie,next) {

    var now = new Date();
    now.setDate(now.getDate() - 1);
    // yesterday
    var yesterday = now.toISOString().split('T')[0];

    var options = {
        method: 'POST',
        url: '',
        qs: {
            CreateTime1: yesterday,
            CreateTime2: yesterday
        },
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            cookie: cookie
        },
        form: CONSTANT.formConstant
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        next(null,JSON.parse(body));
    });
};
