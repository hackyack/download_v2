(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ["$state", "loginService"];

	function SidebarController($state, loginService) {
		var vm = this;

		vm.logout = logout;

		function logout() {
			loginService.logout().then(function (response) {
				console.log("logout !");
				$state.go('login');
			});
		};
	}
})();