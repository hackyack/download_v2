var Settings = require(__base + 'models/settings');
var Accounts = require(__base + 'routes/auth/accounts');

exports.get = function (req, res) {

    var settings = {
        account: {}
    };

    if (req.settings && req.settings.account) {
        if (req.settings.account.synology) {
            settings.account.synology = {
                protocol: req.settings.account.synology.protocol,
                host: req.settings.account.synology.host,
                port: req.settings.account.synology.username,
                username: req.settings.account.synology.username
            }
        }
        if (req.settings.account.t411) {
            settings.account.t411 = {
                username: req.settings.account.t411.username
            }
        }
        if (req.settings.account.movieDB) {
            settings.account.movieDB = {
                 key: req.settings.account.movieDB.key
            }
        }
    }
    res.status(200).json({
        settings: settings
    });
};

exports.linkT411 = function (req, res) {

    if (req.body) {
        var username = req.body.username;
        var password = req.body.password;
    }
    
    if (username && password) {

        Accounts.authT411(req, username, password).then(function (response) {
            req.settings.account.t411.username = username;
            req.settings.account.t411.password = password;

            req.settings.save(function(err) {
                if (!err) {
                    res.status(200).json({
                        success: true
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        err: "Internal Error"
                    });
                }
                
            });
        })
        .catch(function (err) {
            res.status(200).json({
                success: false,
                err: "Error during T411 authentication"
            });
        });
    }
    else {
        res.status(200).json({
            success: false,
            err: "Missing Params"
        });
    }
};

exports.checkT411 = function (req, res) {

    if (req.settings.account && req.settings.account.t411 && req.settings.account.t411.username && req.settings.account.t411.password) {

        Accounts.authT411(req).then(function (response) {
            res.status(200).json({
                success: true
            });
        }).catch(function (err) {
            res.status(200).json({
                success: false
            });
        });
    }
    else {
        res.status(200).json({
            success: false
        });
    }
   
};

exports.linkMovieDB = function (req, res) {

    if (req.body) {
        var key = req.body.key
    }

    if (key) {

        Accounts.authMovieDB(req, key).then(function (response) {
            req.settings.account.movieDB.key = key;

            req.settings.save(function(err) {
                if (!err) {
                    res.status(200).json({
                        success: true
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        err: "Internal Error"
                    });
                }
            });
        })
        .catch(function (err) {
            console.log(err);
            res.status(200).json({
                success: false,
                err: "Error during MovieDB authentication"
            });
        });
    }
    else {
        res.status(200).json({
            success: false,
            err: "Missing Params"
        });
    }
};

exports.checkMovieDB = function (req, res) {

    if (req.settings.account && req.settings.account.movieDB && req.settings.account.movieDB.key) {

        Accounts.authMovieDB(req).then(function (response) {
            res.status(200).json({
                success: true
            });
        }).catch(function (err) {
            res.status(200).json({
                success: false
            });
        });
    }
    else {
        res.status(200).json({
            success: false
        });
    }
};

exports.linkSynology = function (req, res) {

    if (req.body) { 
        var protocol = req.body.protocol;
        var host = req.body.host;
        var port = req.body.port;
        var username = req.body.username;
        var password = req.body.password;
    }
    
    if (protocol && host && port && username && password) {

        Accounts.authSynology(req, protocol, host, port, username, password).then(function (response) {
            req.settings.account.synology.protocol = protocol;
            req.settings.account.synology.host = host;
            req.settings.account.synology.port = port;
            req.settings.account.synology.username = username;
            req.settings.account.synology.password = password;

            req.settings.save(function(err) {
                if (!err) {
                    res.status(200).json({
                        success: true
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        err: "Internal Error"
                    });
                }
                
            });
        })
        .catch(function (err) {
            res.status(200).json({
                success: false,
                err: "Error during Synology authentication"
            });
        });
    }
    else {
        res.status(200).json({
            success: false,
            err: "Missing Params"
        });
    }
};

exports.checkSynology = function (req, res) {

    if (req.settings.account && req.settings.account.synology && req.settings.account.synology.protocol && req.settings.account.synology.host && req.settings.account.synology.port && req.settings.account.synology.username && req.settings.account.synology.password) {

        Accounts.authSynology(req).then(function (response) {
            res.status(200).json({
                success: true
            });
        }).catch(function (err) {
            res.status(200).json({
                success: false
            });
        });
    }
    else {
        res.status(200).json({
            success: false
        });
    }
   
};