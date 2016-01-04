angular.module('app.services')
.factory('settingsService', function ($http, jwtHelper) {
	var settingsService = {};

	settingsService.get = function() {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/settings'
			}).then(function(response) {
				if (response.data && response.data.settings) {
					resolve(response.data.settings);
				}
				else {
					reject();
				}
				
			}).catch(function(err) {
				reject();
			});
		});
	};

	settingsService.linkT411Account = function(username, password) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'POST',
				url: '/api/settings/t411/link',
				headers: {'Content-Type': 'application/json'},	
				data: {
					username: username,
					password: password
				}
			}).then(function(response) {
				if (response.data && response.data.success) {
					resolve(response);
				}
				else {
					reject();
				}
				
			}).catch(function(err) {
				reject();
			});
		});
	}

	settingsService.checkT411Account = function() {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/settings/t411/check',
			}).then(function(response) {
				if (response.data && response.data.success) {
					resolve();
				}
				else {
					reject();
				}
				
			}).catch(function(err) {
				reject();
			});
		});
	}

	settingsService.linkMovieDBAccount = function(key) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'POST',
				url: '/api/settings/moviedb/link',
				headers: {'Content-Type': 'application/json'},	
				data: {
					key: key
				}
			}).then(function(response) {
				if (response.data && response.data.success) {
					resolve(response);
				}
				else {
					reject();
				}
				
			}).catch(function(err) {
				reject();
			});
		});
	}

	settingsService.checkMovieDBAccount = function() {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/settings/moviedb/check',
			}).then(function(response) {
				if (response.data && response.data.success) {
					resolve();
				}
				else {
					reject();
				}
				
			}).catch(function(err) {
				reject();
			});
		});
	}

	return settingsService;
});