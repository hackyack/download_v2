// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require(__base + 'models/user');
var Settings = require(__base + 'models/settings');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, callback) {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'email' :  email }, function(err, user) {
			// if there are any errors, return the error
			if (err) {
				return callback(err);
			}

			// check to see if theres already a user with that email
			if (user) {
				return callback(null, false, { message: "User already exist" });
			} else {
				// if there is no user with that email
				// create the user
				var newUser = new User();

				// set the user's local credentials
				newUser.email = email;
				newUser.password = newUser.generateHash(password); // use the generateHash function in our user model

				// save the user
				newUser.save(function(err) {
					if (err)
						throw err;

					var newSettings = new Settings();

					newSettings.user = newUser;

					// save the settings
					newSettings.save(function(err2) {
						if (err2)
							throw err2;
						return callback(null, newUser);
					});
					
				});
			}

		});

	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, callback) { // callback with email and password from our form
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'email' :  email }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err) {
				return callback(err);
			}
				
			// if no user is found, return the message
			if (!user) {
				return callback(null, false, { message: "No user in database" }); // req.flash is the way to set flashdata using connect-flash
			}
				
			// if the user is found but the password is wrong
			if (!user.validPassword(password)) {
				return callback(null, false, { message: "Invalid password" }); // create the loginMessage and save it to session as flashdata
			}
				
			// all is well, return successful user
			return callback(null, user);
		});

	}));

};