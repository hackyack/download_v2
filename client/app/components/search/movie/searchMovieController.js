'use strict';

angular.module('app.controllers')
.controller('searchMovieController', ["$scope", '$http', 'ngTableParams', function ($scope, $http) {
	self = this;

	self.selectedItemInfo = undefined;
	self.selectItem = undefined;

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

