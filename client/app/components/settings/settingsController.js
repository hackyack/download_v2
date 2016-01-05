'use strict';

angular.module('app.controllers')
.controller('settingsController', ['settingsService', function (settingsService) {
	self = this;

	this.account = {};

	this.folder = {
		downloads: "/downloads",
		tv: "/video/Serie",
		movie: "/video/Film"
	};

	// connected / disconnected / loading / waiting
	this.status = {
		synology: "waiting",
		movieDB: "waiting",
		realDebrid: "waiting",
		t411: "waiting"
	}

	this.account = {
		t411: {
			username: "",
			password: ""
		},
		movieDB: {
			key: ""
		},
		synology: {
			protocol: "",
			host: "",
			port: "",
			username: "",
			password: ""
		}		
	};

	settingsService.get().then(function(settings) {

		if (settings) {
			self.account = settings.account;
		}

	}).catch(function (err) {
		console.log(err);
	});

	// Check T411 account
	this.status.t411 = "loading";
	settingsService.checkT411Account().then(function(response) {
		self.status.t411 = "connected";
		console.log("T411 account linked !");
	}).catch(function (err) {
		self.status.t411 = "disconnected";
		console.log("T411 account not linked...");
	});

	// Link T411 account
	this.linkT411Account = function () {
		self.status.t411 = "loading";
		settingsService.linkT411Account(self.account.t411.username, self.account.t411.password).then(function(response) {
			self.status.t411 = "connected";
			console.log("T411 account linked !");
		}).catch(function (err) {
			self.status.t411 = "disconnected";
			console.log("T411 account not linked...");
		});
	}

	// Check MovieDB account
	this.status.movieDB = "loading";
	settingsService.checkMovieDBAccount().then(function(response) {
		self.status.movieDB = "connected";
		console.log("MovieDB account linked !");
	}).catch(function (err) {
		self.status.movieDB = "disconnected";
		console.log("MovieDB account not linked...");
	});

	// Link MovieDB account
	this.linkMovieDBAccount = function () {
		self.status.movieDB = "loading";
		settingsService.linkMovieDBAccount(self.account.movieDB.key).then(function(response) {
			self.status.movieDB = "connected";
			console.log("MovieDB account linked !");
		}).catch(function (err) {
			self.status.movieDB = "disconnected";
			console.log("MovieDB account not linked...");
		});
	}
	
	// Check Synology account
	this.status.synology = "loading";
	settingsService.checkSynologyAccount().then(function(response) {
		self.status.synology = "connected";
		console.log("Synology account linked !");
	}).catch(function (err) {
		self.status.synology = "disconnected";
		console.log("Synology account not linked...");
	});

	// Link Synology account
	this.linkSynologyAccount = function () {
		self.status.synology = "loading";
		settingsService.linkSynologyAccount(self.account.synology.protocol, self.account.synology.host, self.account.synology.port, self.account.synology.username, self.account.synology.password).then(function(response) {
			self.status.synology = "connected";
			console.log("Synology account linked !");
		}).catch(function (err) {
			self.status.synology = "disconnected";
			console.log("Synology account not linked...");
		});
	}

}]);