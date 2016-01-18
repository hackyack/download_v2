angular.module('app.controllers')
.controller('loginController', ["$http", "$state", "$location", "loginService", function ($http, $state, $location, loginService) {
	self = this;

	this.login = 1;
	this.register = 0;
	this.forgot = 0;

	angular.element('body').removeClass('sw-toggled');

	this.doEmailLogin = function() {
		loginService.login(self.email, self.password).then(function () {
			$state.go('main.home');
        }).catch(function (error) {
            console.log(error);
        });
	};

	this.doEmailSignUp = function() {
		loginService.signUp(self.email, self.password).then(function () {
			console.log(response);
			$state.go('main.home');
        }).catch(function (error) {
            console.log(error);
        });
	};
}]);