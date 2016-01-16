'use strict';

angular.module('app.controllers')
.controller('searchMovieController', ["$scope", '$http', 'steppersService', 'searchMovieService', function ($scope, $http, steppersService, searchMovieService) {
	self = this;

	self.steps = steppersService.steps(["Film", "Téléchargement"]);
	self.term = "";

	self.results = {
		movies: [],
	};

	self.selected = {
		movie: undefined
	};

	self.goTo = function(number) {
		steppersService.goTo(number);
	}

    self.searchMovies = function(term) {
		if (term != undefined && term != "") {
			searchMovieService.searchMovies(term).then(function (movies) {
				self.results.movies = movies;
			})
		}
	};

    self.selectMovie = function(id) {
    	self.selected.movie = {
    		id: id,
    		info: undefined,
    		torrents: []
    	}
    	searchMovieService.getMovieInfo(id).then(function (info) {
    		self.selected.movie.info = info;
    		console.log(info);
    		var year =  self.selected.movie.info.release_date ? self.selected.movie.info.release_date.split("-")[0] : undefined;
    		return searchMovieService.getMovieTorrents(self.selected.movie.info.original_title, year);
    	}).then(function (torrents) {
    		self.selected.movie.torrents = torrents;
    		console.log(torrents);
    		steppersService.next();
    	});
    }

    self.getTorrents = function(id) {
    	self.selected.movie = {
    		id: id,
    		info: undefined,
    	}
    	searchMovieService.getMovieInfo(id).then(function (info) {
    		self.selected.movie.info = info;
    		steppersService.next();
    	});
    }

 }]);

