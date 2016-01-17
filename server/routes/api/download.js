var Accounts = require(__base + 'routes/auth/accounts');

var request = require('request-promise');
var fs = require("fs");

exports.addTorrent = function (req, res) {
};

exports.process = function (req, res) {
	fs.readFile(__base + "files/example.torrent", "utf-8", function (err, data) {
        if (err) {
            throw err;
        }

        Accounts.authRealDebrid(req).then(function (token) {
            return request({
                method: 'PUT',
                uri: 'https://api.real-debrid.com/rest/1.0/torrents/addTorrent',
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: data,
                json: true,
                encoding: null
            });
        }).then(function (response) {
            console.log("success", response);

            res.status(200).json({
                success: true,
                response: response
            });

        }).catch(function (error) {
            console.log("error", error);

            res.status(200).json({
                success: false,
                message: error
            });

        });
    });
};