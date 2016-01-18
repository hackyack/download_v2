var Accounts = require(__base + 'routes/auth/accounts');

var request = require('request-promise');
var fs = require("fs");

exports.addTorrent = function (req, res) {
};

exports.process = function (req, res) {
	fs.readFile(__base + "files/example.torrent", function (err, data) {
        if (err) {
            throw err;
        }

        Accounts.authRealDebrid(req).then(function (token) {
            var r = request({
                method: 'PUT',
                uri: 'https://api.real-debrid.com/rest/1.0/torrents/addTorrent',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/octet-stream"
                },
                json: true
            });
            r.body = data;
            return r;
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