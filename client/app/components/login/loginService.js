angular.module('app.services')
.factory('loginService', function ($http, jwtHelper) {
	var loginService = {};

	loginService.login = function(email, password) {
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
					resolve(response);
				}
				else {
					reject('Internal error, please try again later...');
				}
				
			}).catch(function(err) {
				reject('Internal error, please try again later...');
			});
		});
	};

	loginService.signUp = function(email, password) {
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
					resolve(response);
				}
				else {
					reject('Internal error, please try again later...');
				}
				
			}).catch(function(err) {
				reject('Internal error, please try again later...');
			});
		});
	};

	loginService.isAuthenticated = function() {
		var token = localStorage.getItem('token');
		if (token) {
			return !jwtHelper.isTokenExpired(token);
		} else {
			return false;
		}
	};

	loginService.logout = function() {
		return new Promise(function(resolve, reject) {
			localStorage.removeItem('token');
			resolve();
		});
	};

	return loginService;
});