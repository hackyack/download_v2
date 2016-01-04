angular.module('app.controllers')
.controller('sidebarController', ["$state", "loginService", function ($state, loginService){
	self = this;

	self.logout = function () {
		loginService.logout().then(function (response) {
			console.log("logout !");
			$state.go('login');
		});
	};
}]);