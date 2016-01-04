var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Settings = require(__base + 'models/settings');

exports.authenticateUser = function(req,res,next) {
  // check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if (req.headers["authorization"]) {
		token = req.headers["authorization"].split(" ")[1];
	}
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, __secret, function(err, decoded) {
			if (err) {
				return res.status(403).send({ 
					success: false, 
					message: 'Failed to authenticate token.' 
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.user = decoded;

				Settings.findOne({
			    	user: decoded.id
			    }).then(function(settings) {
			        req.settings = settings;
			        next();
			    }).catch(function(err) {
					return res.status(500).json({
			            success: false,
			            message: 'Internal Error.'
			        });
			    });
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
		
	}
};