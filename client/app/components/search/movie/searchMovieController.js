'use strict';

angular.module('app.controllers')
.controller('searchMovieController', ["$scope", '$http', 'ngTableParams', function ($scope, $http, ngTableParams) {
	self = this;

	self.torrentResult = undefined;

	self.selectedItemInfo = undefined;
	self.selectItem = undefined;

	self.searchTorrent = function() {
		this.torrentResult = undefined;
		this.torrentResult = new ngTableParams(
			{
			    page: 1,
			    count: 10
			}, {
			    getData: function($defer, params) {
			    	$http({
						method: 'GET',
						url: '/api/torrents/' + self.searchTerm,
						params: {
							limit: params.count(),
							offset: (params.page() - 1) * params.count()
						}
					}).then(function(response) {
						var results = response.data.results;
						$defer.resolve(results.torrents);
						params.total(results.total); // recal. page nav controls
					});
			    }
			}
		);
	};

    self.getMovies = function(val) {
    	self.selectItemInfo = undefined;
        return $http({
			method: 'GET',
			url: '/api/moviedb/search/movie',
			params: {
				term: val
			}
		}).then(function (response) {
			if (response.data.success) {
				return response.data.movies.map(function(item){
	                return item;
	            });
			}
        });
    };

    self.selectItem = function(item, model, label) {
    	return $http({
			method: 'GET',
			url: '/api/moviedb/movie/' + model.id
		}).then(function (response) {
			if (response.data.success) {
				self.selectedItemInfo = response.data.info;
			}
			console.log(self.selectedItemInfo);
		});
    };

 }]);

