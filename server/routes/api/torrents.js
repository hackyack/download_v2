var Settings = require(__base + 'models/settings');
var Accounts = require(__base + 'routes/auth/accounts');

var request = require('request-promise');

exports.search = function (req, res) {
    // If term in query
    if (req.params.term && req.params.term != "") {
        Accounts.authT411(req).then(function (token) {
            var term = req.params.term;
            var offset = req.query.offset ? req.query.offset : 0;
            var limit = req.query.limit ? req.query.limit : 10;
            return searchT411(term, offset, limit, token);
        }).then(function (results) {
            res.status(200).json({
                success: true,
                results: results
            });
        }).catch(function (error) {
            res.status(200).json({
                success: false,
                message: error
            });
        });
    }
    else {
        res.status(200).json({
            success: false,
            message: "Missing parameters."
        })
    } 
};

function searchT411(term, offset, limit, token) {
    return new Promise(function(resolve, reject) {
        request({
            method: 'GET',
            uri: 'http://api.t411.in/torrents/search/' + term,
            qs: {
                offset: offset,
                limit: limit
            },
            headers: {
                'Authorization': token
            },
            json: true
        }).then(function (results) {
            if (results.torrents) {
                resolve(results);
            }
            else {
                reject("T411 search error.");
            }           
        }).catch(function (err) {
            reject("T411 search error :" + err);
        })
    });
}

