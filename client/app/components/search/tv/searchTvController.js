'use strict';

angular.module('app.controllers')
.controller('searchTvController', ["$scope", '$http', 'ngTableParams', function ($scope, $http, ngTableParams) {
	self = this;

	self.torrentResult = undefined;

	self.selectedItemInfo = undefined;
	self.selectItem = undefined;

	self.seasons = [];
	self.episodes = [];

    self.getTvs = function(val) {
    	self.selectItemInfo = undefined;
        return $http({
			method: 'GET',
			url: '/api/moviedb/search/tv',
			params: {
				term: val
			}
		}).then(function (response) {
			if (response.data.success) {
				return response.data.tvs.map(function(item){
	                return item;
	            });
			}
        });
    };

    self.selectItem = function(item, model, label) {
    	self.seasons = [];
    	self.episodes = [];
    	$http({
			method: 'GET',
			url: '/api/moviedb/tv/' + model.id
		}).then(function (response) {
			if (response.data.success) {
				self.selectedItemInfo = response.data.info;
			}
			$http({
				method: 'GET',
				url: '/api/moviedb/tv/' + model.id + '/seasons'
			}).then(function (response) {
				if (response.data.success) {
					self.seasons = response.data.seasons;
				}
			});
		});
    };

    self.selectSeason = function(season_number) {
		$http({
			method: 'GET',
			url: '/api/moviedb/tv/' + self.selectedItemInfo.id + '/season/' + season_number + "/episodes"
		}).then(function (response) {
			if (response.data.success) {
				self.episodes = response.data.episodes;
			}
		});
    };

 }]);

