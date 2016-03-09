angular.module('app').config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, jwtInterceptorProvider){
    
    jwtInterceptorProvider.authHeader = 'x-access-token';
    jwtInterceptorProvider.authPrefix = '';
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    cfpLoadingBarProvider.includeBar = false;

    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('main.home');
    });

    $locationProvider.html5Mode(true);

    $stateProvider
    
    .state ('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController as login'
    })

    .state ('main', {
        abstract: true,
        data: {
            permissions: {
                only: ['user'],
                redirectTo: 'login'
            }
        },
        views: {
            '': {
                templateUrl: 'app/shared/main/mainView.html',
                controller: 'mainController as main'
            },
            'header@main': {
                templateUrl: 'app/shared/header/header.html',
                controller: 'HeaderController as header',
            },
            'sidebar@main': {
                templateUrl: 'app/shared/sidebar/sidebar.html',
                controller: 'SidebarController as sidebar',
            }
        }
    })

    .state ('main.home', {
        url: '/home',
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeController as view'
    })

    .state ('main.contact', {
        url: '/contact',
        templateUrl: 'app/components/contact/contact.html',
        controller: 'ContactController as view'
    })

    .state ('main.search', {
        abstract: true,
        templateUrl: 'app/components/search/searchView.html',
        controller: 'searchController as view'
    })

    .state ('main.search.choice', {
        url: '/search',
    })

    .state ('main.search.movie', {
        url: '/search/movie',
        templateUrl: 'app/components/search/movie/search-movie.html',
        controller: 'SearchMovieController as subview'
    })

    .state ('main.search.tv', {
        url: '/search/tv',
        templateUrl: 'app/components/search/tv/searchTvView.html',
        controller: 'searchTvController as subview'
    })

    .state ('main.search.other', {
        url: '/search/other',
        templateUrl: 'app/components/search/other/searchOtherView.html',
        controller: 'searchOtherController as subview'
    })

    .state ('main.settings', {
        url: '/settings',
        templateUrl: 'app/components/settings/settings.html',
        controller: 'SettingsController as view'
    })
})
.run(function($rootScope) {
    $rootScope.controllerClass = "";
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.state = toState.name;
    });
})
.run(function (Permission, loginService) {
    Permission
    // Define user role calling back-end
    .defineRole('user', function (stateParams) {
        return loginService.isAuthenticated();
    });
});