var Settings = require(__base + 'models/settings');
var Accounts = require(__base + 'routes/auth/accounts');

var t411 = require(__base + 'routes/service/t411');
var parser = require(__base + 'routes/service/torrent-data-parser');
var request = require('request-promise');

exports.search = function (req, res) {
    // If term in query
    if (req.params.term && req.params.term != "") {
        Accounts.authT411(req).then(function (token) {
            var term = req.params.term;
            var offset = req.query.offset ? req.query.offset : 0;
            var limit = req.query.limit ? req.query.limit : 10;
            return searchRequest(term, offset, limit, token);
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

function searchRequest(term, offset, limit, token) {
    return new Promise(function(resolve, reject) {
        request({
            method: 'GET',
            uri: 'http://api.t411.ch/torrents/search/' + term,
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

exports.searchMovie = function (req, res) {
    // If term in query
    if (req.params.movie && req.params.movie != "") {
        Accounts.authT411(req).then(function (token) {
            var movie = req.params.movie;
            return searchMovieRequest(movie, token);
        }).then(function (results) {
            var torrents = [];
            torrents = parser.extract(results.torrents);
            torrents = parser.sort(torrents);
            results.torrents = torrents;
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

function searchMovieRequest(movie, token) {
    return new Promise(function(resolve, reject) {
        var query = {};
        query["cid"] = t411.constants.type.movie;
        query["limit"] = 100;
        request({
            method: 'GET',
            uri: 'http://api.t411.ch/torrents/search/' + movie,
            qs: query,
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


exports.searchTv = function (req, res) {
    // If term in query
    if (req.params.tvshow && req.params.tvshow != "" && req.query.season && req.query.episode) {
        Accounts.authT411(req).then(function (token) {
            var tvshow = req.params.tvshow;
            var season = req.query.season;
            var episode = req.query.episode;
            return searchTvRequest(tvshow, season, episode, token);
        }).then(function (results) {
            var torrents = [];
            torrents = parser.extract(results.torrents);
            torrents = parser.sort(torrents);
            results.torrents = torrents;
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

function searchTvRequest(tvshow, season_number, episode_number, token) {
    return new Promise(function(resolve, reject) {
        var query = {};
        query["cid"] = t411.constants.type.tvshow;
        query[t411.constants.term.season] = t411.getSeasonId(season_number);
        query[t411.constants.term.episode] = t411.getEpisodeId(episode_number);
        query["limit"] = 100;
        request({
            method: 'GET',
            uri: 'http://api.t411.ch/torrents/search/' + tvshow,
            qs: query,
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
