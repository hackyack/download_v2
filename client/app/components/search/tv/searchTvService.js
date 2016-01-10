angular.module('app.services')
.factory('searchTvService', function ($http) {
	var searchTvService = {};

	searchTvService.searchTvs = function(term) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/search/tv',
				params: {
					term: term
				}
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.tvs);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};

	searchTvService.getSeasons = function(id) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/tv/' + self.selected.tv.id + '/seasons'
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.seasons);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};

	searchTvService.getTvInfo = function(id) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/tv/' + id
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

	searchTvService.getEpisodes = function (id, season_number) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/tv/' + id + '/season/' + season_number + "/episodes"
			}).then(function (response) {
				if (response.data.success) {
					resolve(response.data.episodes);
				}
				else {
					reject();
				}
			}).catch(function (err) {
				reject();
			});
		});
	};
	
	searchTvService.getSeasonInfo = function (id, season_number) {
		return new Promise(function(resolve, reject) {
			$http({
				method: 'GET',
				url: '/api/moviedb/tv/' + id + '/season/' + season_number
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


	return searchTvService;
});