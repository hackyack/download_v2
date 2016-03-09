(function () {
    'use strict';
    angular
        .module('app.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = [];

    function HeaderController() {
        var vm = this;
     	// Search action
        vm.openSearch = openSearch;
        vm.closeSearch = closeSearch;
        vm.test = false;

        function openSearch(){
            angular.element('#header').addClass('search-toggled');
        };

        function closeSearch(){
            angular.element('#header').removeClass('search-toggled');
        };

        //Fullscreen View
        function fullScreen() {
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
    }

})();