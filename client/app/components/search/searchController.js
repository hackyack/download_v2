'use strict';

angular.module('app.controllers')
.controller('searchController', ['$state', function ($state) {
	self = this;
	self.state = $state.current.name.split(".").pop();
 }]);

