'use strict';

angular.module('app.controllers')
.controller('appController', ['$state', function ($state) {
	self = this;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   angular.element('html').addClass('ismobile');
	}

	// By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
	self.sidebarToggle = {
		left: false,
		right: false
	}

	// By default template has a boxed layout
	self.layoutType = localStorage.getItem('ma-layout-status');

	//Close sidebar on click
	self.sidebarStat = function(event) {
		if (!angular.element(event.target).parent().hasClass('active')) {
			this.sidebarToggle.left = false;
		}
	}


}])

.controller('mainController', ['$state', function ($state) {
	self = this;
}]);	