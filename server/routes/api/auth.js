var passport = require('passport');
var jwt = require('jsonwebtoken');

var tokenSecret = "mysecret";

exports.localLogin = function (req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(200).json({
				error: info.message
			});
		}

		//user has authenticated correctly thus we create a JWT token 
		var token = getToken({ id: user._id, email: user.email });
		
		return res.status(200).json({
			token : token
		});
	})(req, res, next);
};

exports.localSignup = function (req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(200).json({
				error: info.message
			});
		}

		//user has authenticated correctly thus we create a JWT token 
		var token = getToken({ id: user._id, email: user.email });

		return res.status(200).json({
			token : token
		});
	})(req, res, next);
};

function getToken(data) {
	var token = jwt.sign(data, __secret, {
		expiresIn: 30 * 24 * 60 * 60 // expires in 30 days
	});

	return token;
}