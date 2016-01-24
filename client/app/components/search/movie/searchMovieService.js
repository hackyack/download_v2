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

	searchMovieService.getMovieTorrents = function(name, year) {
		return new Promise(function(resolve, reject) {
			var term = name;
			if (year) {
				term + " " + year
			}
			$http({
				method: 'GET',
				url: '/api/torrents/movie/' + term
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.results.torrents);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};

	searchMovieService.startTorrentTask = function(infos) {
		return new Promise(function(resolve, reject) {
			var fd = new FormData();
    		for (var key in infos) {
    			if (infos[key]) {
    				fd.append(key, infos[key]);
    			}
    		}
			$http({
				method: 'POST',
				url: '/api/tasks/torrent',
				data: fd,
				transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
			}).then(function (response) {
				if (response.data.success) {
					resolve();
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