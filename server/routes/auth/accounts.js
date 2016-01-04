var request = require('request-promise');

exports.authT411 = function (req, username, password) {
    return new Promise(function(resolve, reject) {
        username = username ? username : req.settings.account.t411.username;
        password = password ? password : req.settings.account.t411.password;

        if (!(req.settings.account && req.settings.account.t411 && req.settings.account.t411.token && req.settings.account.t411.expires_at) || Date.now() > req.settings.account.t411.expires_at || username) {
            request({
                method: 'POST',
                uri: 'http://api.t411.in/auth',
                form: {
                    username: username,
                    password: password
                },
                json: true
            }).then(function (response) {
                if (response.token) {
                    var expirationDate = new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000);

                    req.settings.account.t411.token = response.token;
                    req.settings.account.t411.expires_at = expirationDate;
                    req.settings.save(function (err) {
                        if (!err) {
                            resolve(response.token);
                        }
                        else {
                            reject();
                        }
                    });
                }
                else {
                    reject();
                }           
            }).catch(function (err) {
                reject();
            });
        }
        else {
            resolve(req.settings.account.t411.token);
        }
    });
};

exports.authMovieDB = function(req, key) {
    return new Promise(function(resolve, reject) {
        key = key ? key : req.settings.account.movieDB.key;

        if (!(req.settings.account && req.settings.account.movieDB && req.settings.account.movieDB.token && req.settings.account.movieDB.expires_at) || Date.now() > req.settings.account.movieDB.expires_at || key) {
            request({
                method: 'GET',
                uri: 'https://api.themoviedb.org/3/authentication/token/new',
                qs: {
                  api_key: key
                },
                json: true
            }).then(function (response) {
                if (response.success) {
                    req.settings.account.movieDB.token = response.request_token;
                    req.settings.account.movieDB.expires_at = response.expires_at;
                    req.settings.save(function (err) {
                        if (!err) {
                            resolve(req.settings.account.movieDB.key);
                        }
                        else {
                            reject();
                        }
                    });
                }
                else {
                    reject();
                }           
            }).catch(function (err) {
                reject();
            });
        }
        else {
            resolve(req.settings.account.movieDB.token);
        }
    });
};
