angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

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

        .when('/pages/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .when('/pages/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupController'
        })

        .otherwise({
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });

	$locationProvider.html5Mode(true);

}]);