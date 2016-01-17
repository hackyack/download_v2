var Accounts = require(__base + 'routes/auth/accounts');

var request = require('request-promise');

exports.checkLink = function (req, res) {
	
	request({
        method: 'POST',
        uri: 'https://api.real-debrid.com/rest/1.0/unrestrict/check',
        form: {
	        link: req.query.link
	    },
        json: true
    }).then(function (response) {
        if (response && response.filename) {
            res.status(200).json({
                success: true,
                link: response
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "No valid response from RealDebrid"
            });
        }
    }).catch(function (error) {
         res.status(200).json({
            success: false,
            message: error
        });
    });
};

exports.unrestrickLink = function (req, res) {

    Accounts.authRealDebrid(req).then(function (token) {
        return request({
            method: 'POST',
            uri: 'https://api.real-debrid.com/rest/1.0/unrestrict/link',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            form: {
		        link: req.query.link
		    },
            json: true
        });
    }).then(function (response) {
    	console.log(response);
        if (response && response.filename) {
            res.status(200).json({
                success: true,
                link: response
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "No valid response from RealDebrid"
            });
        }
    }).catch(function (error) {
         res.status(200).json({
            success: false,
            message: error
        });
    });
};