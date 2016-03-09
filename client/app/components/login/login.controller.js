(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ["$state", "loginService"];

	function LoginController($state, loginService) {
		var vm = this;
		
		vm.doEmailLogin = doEmailLogin;
		vm.doEmailSignUp = doEmailSignUp;
		vm.forgot = 0;
		vm.login = 1;
		vm.register = 0;

		activate();

		function activate() {
			angular.element('body').removeClass('sw-toggled');
		}

		function doEmailLogin() {
			loginService.login(vm.email, vm.password).then(function () {
				$state.go('main.home');
	        }).catch(function (error) {
	            console.log(error);
	        });
		}

		function doEmailSignUp() {
			loginService.signUp(vm.email, vm.password).then(function () {
				$state.go('main.home');
	        }).catch(function (error) {
	            console.log(error);
	        });
		}
	}
})();