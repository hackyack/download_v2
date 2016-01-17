// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var settingsSchema = Schema({
	user: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	account: {
		synology: {
			protocol: String,
			host: String,
			port: Number,
			username: String,
			password: String
		},
		movieDB: {
			key: String,
			token: String,
			expires_at: Date
		},
		realDebrid: {
			key: String
		}, 
		t411: {
			username: String,
			password: String,
			token: String,
			expires_at: Date
		}
	},
	download: {
		folder: {
			downloads: String,
			movie: String,
			tv: String
		}
	}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Settings', settingsSchema);