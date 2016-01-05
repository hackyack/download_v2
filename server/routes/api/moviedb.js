var Accounts = require(__base + 'routes/auth/accounts');

var request = require('request-promise');

exports.searchMovie = function (req, res) {

    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/search/movie',
            qs: {
                api_key: token,
                query: req.query.term,
                language: "fr"
            },
            json: true
        });
    }).then(function (response) {
        if (response) {
            var movies = [];
            for (var i in response.results) {
                var result = response.results[i];
                year =  result.release_date ? result.release_date.split("-")[0] : undefined;
                var movie = {
                    id: result.id,
                    name: result.title,
                    image: result.poster_path,
                    year: year
                };
                if (movies.length == 5) {
                    break;
                }
                movies.push(movie);
            }
            res.status(200).json({
                success: true,
                movies: movies
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "No valid response from MovieDB"
            });
        }
    }).catch(function (error) {
         res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.getMovieInfo = function (req, res) {

    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/movie/' + req.params.id,
            qs: {
                api_key: token,
                language: "fr"
            },
            json: true
        });
    }).then(function (info) {
        res.status(200).json({
            success: true,
            info: info
        });
    }).catch(function (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.searchTv = function (req, res) {

    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/search/tv',
            qs: {
                api_key: token,
                query: req.query.term,
                language: "fr"
            },
            json: true
        });
    }).then(function (response) {
        var tvs = [];
        for (var i in response.results) {
            var result = response.results[i];
            var tv = {
                id: result.id,
                name: result.original_name,
                image: result.poster_path
            };
            if (tvs.length == 5) {
                break;
            }
            tvs.push(tv);
        }
        res.status(200).json({
            success: true,
            tvs: tvs
        });
    }).catch(function (error) {
         res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.getTvInfo = function (req, res) {

    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/tv/' + req.params.id,
            qs: {
                api_key: token,
                language: "fr"
            },
            json: true
        });
    }).then(function (info) {
        res.status(200).json({
            success: true,
            info: info
        });
    }).catch(function (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.getTvSeasonInfo = function (req, res) {
    
    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/tv/' + req.params.id + '/season/' + req.params.season_number,
            qs: {
                api_key: token,
                language: "fr"
            },
            json: true
        });
    }).then(function (info) {
        res.status(200).json({
            success: true,
            info: info
        });
    }).catch(function (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.getSeasons = function (req, res) {

    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/tv/' + req.params.id,
            qs: {
                api_key: token,
                language: "fr"
            },
            json: true
        });
    }).then(function (response) {
        var seasons = [];
        for (var i in response.seasons) {
            var result = response.seasons[i];
            var season = {
                season_number: result.season_number,
                episode_count: result.episode_count,
                air_date: result.air_date,
                poster_path: result.poster_path
            };
            seasons.push(season);
        }
        res.status(200).json({
            success: true,
            seasons: seasons
        });
    }).catch(function (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.getEpisodes = function (req, res) {
    
    Accounts.authMovieDB(req).then(function (token) {
        return request({
            method: 'GET',
            uri: 'https://api.themoviedb.org/3/tv/' + req.params.id + '/season/' + req.params.season_number,
            qs: {
                api_key: token,
                language: "fr"
            },
            json: true
        });
    }).then(function (response) {
        var episodes = [];
        for (var i in response.episodes) {
            var result = response.episodes[i];
            var episode = {
                episode_number: result.episode_number,
                air_date: result.air_date,
                name: result.name
            };
            episodes.push(episode);
        }
        res.status(200).json({
            success: true,
            episodes: episodes
        });
    }).catch(function (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    });
};

function authMovieDB(req) {
    return new Promise(function(resolve, reject) {
        if (req.settings.account && req.settings.account.movieDB && req.settings.account.movieDB.key) {
            resolve(req.settings.account.movieDB.key);
        }
        else {
            reject("No MovieDB account configured.");
        }
    });
}