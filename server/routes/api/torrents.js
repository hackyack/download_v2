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
            for (var i in results.torrents) {
                torrents.push(extractData(results.torrents[i]));
            }
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
        request({
            method: 'GET',
            uri: 'http://api.t411.in/torrents/search/' + tvshow,
            qs: {
                "cid": 433,                                     // TV Show type
                "term[45][]": getSeasonId(season_number),       // Season
                "term[46][]": getEpisodeId(episode_number),      // Episode
                limit: 100
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

function getEpisodeId(number) {
    number = parseInt(number);
    if (0 < number && number < 9) {
        return number + 936;
    }
    else if (8 < number && number < 31) {
        return number + 937;
    }
    else if (30 < number && number < 61) {
        return number + 1057;
    }
    else {
        return undefined;
    }
}

function getSeasonId(number) {
    number = parseInt(number);
    if (number == 0) {
        return 1068;
    }
    if (0 < number && number < 31) {
        return number + 967;
    }
    else {
        return undefined;
    }
}


function extractData(torrent) {
    return {
        id: torrent.id,
        name: torrent.name,
        size: torrent.size,
        quality: DataParser.get("quality", torrent.rewritename),
        language: DataParser.get("language", torrent.rewritename),
        codec: DataParser.get("codec", torrent.rewritename),
        seeders: torrent.seeders,
        date: torrent.added
    }
}

var DataParser = {
    datas: {
        codec: {
            "x265": ["265"],
            "x264": ["264"]
        },
        language: {
            "multi": ["multi"],
            "vf": ["vf", "french"],
            "vostfr": ["vostfr"]            
        },
        quality: {
            "1080p": ["1080"],
            "720p": ["720"],
        }
    },
    get: function(type, name) {
        var types = this.datas[type];
        for (var i in types) {
            for (var j in types[i]) {
                if (name.indexOf(types[i][j]) > 1) {
                    return i;
                }
            }
        }
        return "";
    } 
};

