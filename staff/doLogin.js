'use strict';

var request = require("request");

module.exports = function(next) {

    var conf = {
        url: 'https://',
        userName: "",
        passWord: ""
    };

    var options = {
        method: 'POST',
        url: conf.url,
        form: {
            "LoginPwd": conf.passWord,
            "UserName": conf.userName
        }
    };

    request(options, function (error, res, body) {
        if (error) throw new Error(error);

        var cookie = res.headers["set-cookie"];

        next(null,cookie);
    });
};


