angular.module('app.services')
.factory('searchMovieService', function ($http) {
	var searchMovieService = {};

	searchMovieService.searchMovies = function(term) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/search/movie',
				params: {
					term: term
				}
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.movies);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};

	searchMovieService.getMovieInfo = function(id) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/movie/' + id
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.info);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};


	return searchMovieService;
});