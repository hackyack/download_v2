(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('searchMovieService', searchMovieService);

	searchMovieService.$inject = ['$http'];

	function searchMovieService($http) {
		var service = {
			searchMovies: searchMovies,
			getMovieInfo: getMovieInfo,
			getMovieTorrents: getMovieTorrents,
			startTorrentTask: startTorrentTask
		};

		return service;

		////////////

		function searchMovies(term) {
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
		}

		function getMovieInfo(id) {
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
		}

		function getMovieTorrents(name, year) {
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
		}

		function startTorrentTask(infos) {
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
		}
	};
})();