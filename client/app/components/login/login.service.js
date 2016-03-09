(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', 'jwtHelper'];

	function loginService($http, jwtHelper) {
		var service = {
			isAuthenticated: isAuthenticated,
			login: login,
			logout: logout,
			signUp: signUp
		};

		return service;

		////////////

		function login(email, password) {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'POST',
					url: '/api/auth/login',
					headers: {'Content-Type': 'application/json'},
					skipAuthorization: true,
					data: {
						email: email,
						password: password
					}
				}).then(function(response) {
					if (response.data && response.data.token) {
						localStorage.setItem("token", response.data.token);
						resolve();
					}
					else {
						reject('Internal error, please try again later...');
					}
					
				}).catch(function(err) {
					reject('Internal error, please try again later...');
				});
			});
		}

		function signUp(email, password) {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'POST',
					url: '/api/auth/signup',
					headers: {'Content-Type': 'application/json'},
					skipAuthorization: true,
					data: {
						email: email,
						password: password
					}
				}).then(function(response) {
					if (response.data && response.data.token) {
						localStorage.setItem("token", response.data.token);
						resolve();
					}
					else {
						reject('Internal error, please try again later...');
					}
					
				}).catch(function(err) {
					reject('Internal error, please try again later...');
				});
			});
		};

		function isAuthenticated() {
			var token = localStorage.getItem('token');
			if (token) {
				return !jwtHelper.isTokenExpired(token);
			} else {
				return false;
			}
		};

		function logout() {
			return new Promise(function(resolve, reject) {
				localStorage.removeItem('token');
				resolve();
			});
		};
	}
})();