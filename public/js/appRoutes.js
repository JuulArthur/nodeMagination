angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/pages/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/pages/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})

        .otherwise({
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });

	$locationProvider.html5Mode(true);

}]);