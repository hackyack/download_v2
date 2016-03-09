(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('SearchMovieController', SearchMovieController);

	SearchMovieController.$inject = ["$scope", '$http', 'steppersService', 'searchMovieService']

	function SearchMovieController($scope, $http, steppersService, searchMovieService) {
		var vm = this;

		vm.steps = steppersService.steps(["Film", "Téléchargement"]);
		vm.term = "";

		vm.results = {
			movies: [],
		};

		vm.selected = {
			movie: undefined
		};

		vm.download = {
			auto: {},
			direct: {
				link: "",
				data: undefined
			},
			torrent: {}
		};
		
		vm.method = '';

		vm.goTo = goTo;
		vm.searchMovies = searchMovies;
		vm.selectMovie = selectMovie;
		vm.checkLink = checkLink;
		vm.startTask = startTask;

		vm.torrent = undefined;
		
		function goTo(number) {
			steppersService.goTo(number);
		}

		function searchMovies(term) {
			if (term != undefined && term != "") {
				searchMovieService.searchMovies(term).then(function (movies) {
					vm.results.movies = movies;
				})
			}
		};

		function selectMovie(id) {
			vm.selected.movie = {
				id: id,
				info: undefined,
				torrents: []
			}
			searchMovieService.getMovieInfo(id).then(function (info) {
				vm.selected.movie.info = info;
				console.log(info);
				var year =  vm.selected.movie.info.release_date ? vm.selected.movie.info.release_date.split("-")[0] : undefined;
				return searchMovieService.getMovieTorrents(vm.selected.movie.info.original_title, year);
			}).then(function (torrents) {
				vm.selected.movie.torrents = torrents;
				console.log(torrents);
				vm.method = 'auto';
				steppersService.next();
			});
		}

		function checkLink() {
			$http({
				method: 'GET',
				url: '/api/realdebrid/check/',
				params: {
					link: vm.download.direct.link
				}
			}).then(function (response) {
				if (response.data.success) {
					vm.download.direct.data = response.data.link;
				}
				else {
					vm.download.direct.data = undefined;
				}
			}).catch(function (err) {
				vm.download.direct.data = undefined;
			});
		}

		function startTask() {
			console.log(vm.torrent);
			var infos = {
				type: "movie",
				title: vm.selected.movie.info.original_title,
				year: vm.selected.movie.info.year,
				torrent: vm.torrent
			}
			searchMovieService.startTorrentTask(infos).then(function() {
				console.log('success');
			});
		}
	}
})();

