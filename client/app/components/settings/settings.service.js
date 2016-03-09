(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('settingsService', settingsService);

	settingsService.$inject = ['$http', 'jwtHelper'];

	function settingsService($http, jwtHelper) {
		var service = {
			get: get,

			checkT411Account: checkT411Account,
			checkMovieDBAccount: checkT411Account,
			checkSynologyAccount: checkSynologyAccount,
			checkRealDebridAccount: checkRealDebridAccount,

			linkT411Account: linkT411Account,
			linkMovieDBAccount: linkT411Account,
			linkSynologyAccount: linkSynologyAccount,
			linkRealDebridAccount: linkRealDebridAccount,

			initAccounts: initAccounts,
			initStatus: initStatus,
			getFolders: getFolders
		};

		return service;

		////////////

		function initAccounts() {
			var accounts = {};
			accounts.t411 = {
				username: "",
				password: ""
			};
			accounts.movieDB = {
				key: ""
			};
			accounts.synology = {
				protocol: "",
				host: "",
				port: "",
				username: "",
				password: ""
			};
			accounts.realDebrid = {
				key: ""
			};
			return accounts;
		}

		function initStatus() {
			var status = {
				synology: "waiting",
				movieDB: "waiting",
				realDebrid: "waiting",
				t411: "waiting"
			}
			return status;
		}

		function getFolders() {
			var folders = {
				downloads: "/downloads",
				tv: "/video/Serie",
				movie: "/video/Film"
			};
			return folders;
		}

		function get() {
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
		}

		function linkT411Account(username, password) {
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

		function checkT411Account() {
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

		function linkMovieDBAccount(key) {
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

		function checkMovieDBAccount() {
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

		function linkSynologyAccount(protocol, host, port, username, password) {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'POST',
					url: '/api/settings/synology/link',
					headers: {'Content-Type': 'application/json'},	
					data: {
						protocol: protocol,
						host: host,
						port: port,
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

		function checkSynologyAccount() {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'GET',
					url: '/api/settings/synology/check',
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

		function linkRealDebridAccount(key) {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'POST',
					url: '/api/settings/realdebrid/link',
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

		function checkRealDebridAccount() {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'GET',
					url: '/api/settings/realdebrid/check',
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
	}
})();