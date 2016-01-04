'use strict';

angular.module('app.controllers')
.controller('headerController', [function (){
    self = this;
 	// Search action
    self.openSearch = function(){
        angular.element('#header').addClass('search-toggled');
        //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
    };

    self.closeSearch = function(){
    	console.log("close");
        angular.element('#header').removeClass('search-toggled');
    };
    
    self.test = false;

    //Fullscreen View
    self.fullScreen = function() {
        //Launch
        function launchIntoFullscreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        //Exit
        function exitFullscreen() {
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        if (exitFullscreen()) {
            launchIntoFullscreen(document.documentElement);
        }
        else {
            launchIntoFullscreen(document.documentElement);
        }
    }

}]);