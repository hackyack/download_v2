'use strict';

angular.module('app.controllers')
.controller('searchOtherController', ["$scope", '$http', 'ngTableParams', function ($scope, $http, ngTableParams) {
	self = this;

	self.torrentResult = undefined;

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

 }]);

