'use strict';

angular.module('app.controllers')
.controller('searchTvController', ["$scope", '$http', 'steppersService', 'searchTvService', function ($scope, $http, steppersService, searchTvService) {
	self = this;

	self.steps = steppersService.steps(["Série", "Saison", "Episode(s)", "Téléchargement"]);
	self.term = "";

	self.results = {
		tvs: [],
		seasons: [],
		episodes: []
	};

	self.selected = {
		tv: undefined,
		season: undefined,
		episodes: []
	};

	self.episodesSelection = {};
	self.selectedAllEpisodes = false;

	self.goTo = function(number) {
		steppersService.goTo(number);
	}

	self.searchTvs = function(term) {
		if (term != undefined && term != "") {
			searchTvService.searchTvs(term).then(function (tvs) {
				self.results.tvs = tvs;
			})
		}
	};

    self.selectTv = function(id) {
    	self.selected.tv = {
    		id: id,
    		info: undefined,
    	}
    	var getTvInfoPromise = searchTvService.getTvInfo(id);
    	var getSeasonsPromise = searchTvService.getSeasons(id);

    	getTvInfoPromise.then(function (info) {
    		self.selected.tv.info = info;
    	});
    	getSeasonsPromise.then(function (seasons) {
    		self.results.seasons = seasons;
    	});
    	Promise.all([getTvInfoPromise, getSeasonsPromise]).then(function (responses) {
    		steppersService.next();
    	});
    }

    self.selectSeason = function(season_number) {
    	self.selected.season = {
    		season_number: season_number,
    		info: undefined,
    	}

    	self.episodesSelection = {};
		self.allEpisodesCheckbox = false;

    	var getSeasonInfoPromise = searchTvService.getSeasonInfo(self.selected.tv.id, season_number);
    	var getEpisodesPromise = searchTvService.getEpisodes(self.selected.tv.id, season_number);

    	getSeasonInfoPromise.then(function (info) {
    		self.selected.season.info = info;
    	});
    	getEpisodesPromise.then(function (episodes) {
    		self.results.episodes = episodes;
    		for (var i in episodes) {
    			self.episodesSelection[episodes[i].episode_number] = false;
    		}
    	});
    	Promise.all([getSeasonInfoPromise, getEpisodesPromise]).then(function (responses) {
    		steppersService.next();
    	});
    }

    self.toggleAllEpisodes = function() {
    	for (var i in self.episodesSelection) {
    		self.episodesSelection[i] = self.allEpisodesCheckbox;
    	}
    }

    self.checkCheckedAllEpisodes = function() {
    	var count = 0;
    	var checkedCount = 0;
    	for (var i in self.episodesSelection) {
    		count++;
    		if (self.episodesSelection[i]) {
    			checkedCount++
    		}
    	}
    	self.allEpisodesCheckbox = count == checkedCount && count > 0;
    }
 }]);

