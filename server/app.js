//Define base path
global.__base = __dirname + '/';
global.__secret = "secretTest";

// set up ========================
var express  = require('express');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
var db = require('./models/db');
var config = require('config');
var passport = require('passport');
var middleware = require('./middleware');
var errorhandler = require('errorhandler');
var multiparty = require('connect-multiparty');

var app = module.exports = express();

require('./routes/auth/passport')(passport); // pass passport for configuration

app.use('/app', express.static(__dirname + '/../client/app'));                // set the static files location /public/img will be /img for users
app.use('/assets', express.static(__dirname + '/../client/assets'));


var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(errorhandler());
app.use(multiparty());

var API = {};
API.auth = require('./routes/api/auth');
API.settings = require('./routes/api/settings');
API.torrents = require('./routes/api/torrents');
API.movieDB = require('./routes/api/moviedb');
API.realdebrid = require('./routes/api/realdebrid');
API.download = require('./routes/api/download');
API.tasks = require('./routes/api/tasks');

// Routes
// Authentication
app.post('/api/auth/signup', API.auth.localSignup);
app.post('/api/auth/login', API.auth.localLogin);

// Settings 
app.get('/api/settings', middleware.authenticateUser, API.settings.get);
app.post('/api/settings/t411/link', middleware.authenticateUser, API.settings.linkT411);
app.get('/api/settings/t411/check', middleware.authenticateUser, API.settings.checkT411);
app.post('/api/settings/moviedb/link', middleware.authenticateUser, API.settings.linkMovieDB);
app.get('/api/settings/moviedb/check', middleware.authenticateUser, API.settings.checkMovieDB);
app.post('/api/settings/synology/link', middleware.authenticateUser, API.settings.linkSynology);
app.get('/api/settings/synology/check', middleware.authenticateUser, API.settings.checkSynology);
app.post('/api/settings/realdebrid/link', middleware.authenticateUser, API.settings.linkRealDebrid);
app.get('/api/settings/realdebrid/check', middleware.authenticateUser, API.settings.checkRealDebrid);

// Torrents
app.get('/api/torrents/:term', middleware.authenticateUser, API.torrents.search);
app.get('/api/torrents/tv/:tvshow', middleware.authenticateUser, API.torrents.searchTv);
app.get('/api/torrents/movie/:movie', middleware.authenticateUser, API.torrents.searchMovie);

// Debrid
app.get('/api/realdebrid/check', middleware.authenticateUser, API.realdebrid.checkLink);

// Download
//app.get('/api/download/process', middleware.authenticateUser, API.download.process);

// Tasks
app.post('/api/tasks/torrent', middleware.authenticateUser, API.tasks.torrent);
app.post('/api/tasks/magnet', middleware.authenticateUser, API.tasks.magnet);
app.post('/api/tasks/t411', middleware.authenticateUser, API.tasks.t411);
app.post('/api/tasks/link', middleware.authenticateUser, API.tasks.link);

// Movie and TV
app.get('/api/moviedb/search/movie', middleware.authenticateUser, API.movieDB.searchMovie);
app.get('/api/moviedb/movie/:id', middleware.authenticateUser, API.movieDB.getMovieInfo);

app.get('/api/moviedb/search/tv', middleware.authenticateUser, API.movieDB.searchTv);
app.get('/api/moviedb/tv/:id', middleware.authenticateUser, API.movieDB.getTvInfo);
app.get('/api/moviedb/tv/:id/season/:season_number', middleware.authenticateUser, API.movieDB.getTvSeasonInfo);

app.get('/api/moviedb/tv/:id/seasons', middleware.authenticateUser, API.movieDB.getSeasons);
app.get('/api/moviedb/tv/:id/season/:season_number/episodes', middleware.authenticateUser, API.movieDB.getEpisodes);

app.all('/*', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

// listen (start app with node server.js) ======================================
var port = 8181;
app.listen(port);
console.log("App listening on port " + port);