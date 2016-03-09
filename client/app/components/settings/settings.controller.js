(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ["settingsService"];

	function SettingsController(settingsService) {
		var vm = this;
		
		vm.account = {};
		
		vm.folder = settingsService.getFolders();
		vm.status = settingsService.initStatus();
		vm.account = settingsService.initAccounts();
		
		vm.linkT411Account = linkT411Account;
		vm.linkMovieDBAccount = linkMovieDBAccount;
		vm.linkSynologyAccount = linkSynologyAccount;
		vm.linkRealDebridAccount = linkRealDebridAccount;

		activate();

		function activate() {
			settingsService.get().then(function(settings) {
				if (settings) {
					vm.account = settings.account;
				}
			}).catch(function (err) {
				console.log(err);
			});
			checkT411Account();
			checkMovieDBAccount();
			checkSynologyAccount();
			checkRealDebridAccount();
		}

		// Check T411 account
		function checkT411Account() {
			vm.status.t411 = "loading";
			settingsService.checkT411Account().then(function(response) {
				vm.status.t411 = "connected";
				console.log("T411 account linked !");
			}).catch(function (err) {
				vm.status.t411 = "disconnected";
				console.log("T411 account not linked...");
			});
		}
		
		// Link T411 account
		function linkT411Account() {
			vm.status.t411 = "loading";
			settingsService.linkT411Account(vm.account.t411.username, vm.account.t411.password).then(function(response) {
				vm.status.t411 = "connected";
				console.log("T411 account linked !");
			}).catch(function (err) {
				vm.status.t411 = "disconnected";
				console.log("T411 account not linked...");
			});
		}

		// Check MovieDB account
		function checkMovieDBAccount() {
			vm.status.movieDB = "loading";
			settingsService.checkMovieDBAccount().then(function(response) {
				vm.status.movieDB = "connected";
				console.log("MovieDB account linked !");
			}).catch(function (err) {
				vm.status.movieDB = "disconnected";
				console.log("MovieDB account not linked...");
			});
		}

		// Link MovieDB account
		function linkMovieDBAccount() {
			vm.status.movieDB = "loading";
			settingsService.linkMovieDBAccount(vm.account.movieDB.key).then(function(response) {
				vm.status.movieDB = "connected";
				console.log("MovieDB account linked !");
			}).catch(function (err) {
				vm.status.movieDB = "disconnected";
				console.log("MovieDB account not linked...");
			});
		}
		
		// Check Synology account
		function checkSynologyAccount() {
			vm.status.synology = "loading";
			settingsService.checkSynologyAccount().then(function(response) {
				vm.status.synology = "connected";
				console.log("Synology account linked !");
			}).catch(function (err) {
				vm.status.synology = "disconnected";
				console.log("Synology account not linked...");
			});
		}

		// Link Synology account
		function linkSynologyAccount() {
			vm.status.synology = "loading";
			settingsService.linkSynologyAccount(vm.account.synology.protocol, vm.account.synology.host, vm.account.synology.port, vm.account.synology.username, vm.account.synology.password).then(function(response) {
				vm.status.synology = "connected";
				console.log("Synology account linked !");
			}).catch(function (err) {
				vm.status.synology = "disconnected";
				console.log("Synology account not linked...");
			});
		}

		// Check RealDebrid account
		function checkRealDebridAccount() {
			vm.status.realDebrid = "loading";
			settingsService.checkRealDebridAccount().then(function(response) {
				vm.status.realDebrid = "connected";
				console.log("RealDebrid account linked !");
			}).catch(function (err) {
				vm.status.realDebrid = "disconnected";
				console.log("RealDebrid account not linked...");
			});
		}

		// Link MovieDB account
		function linkRealDebridAccount() {
			vm.status.realDebrid = "loading";
			settingsService.linkRealDebridAccount(vm.account.realDebrid.key).then(function(response) {
				vm.status.realDebrid = "connected";
				console.log("RealDebrid account linked !");
			}).catch(function (err) {
				vm.status.realDebrid = "disconnected";
				console.log("RealDebrid account not linked...");
			});
		}
	}
})();