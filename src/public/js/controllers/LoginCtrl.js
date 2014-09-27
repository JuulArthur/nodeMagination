/**
 * Created by Juul on 03/09/14.
 */
angular.module('MainCtrl').controller('LoginController', function($scope, $http) {

    $scope.login = function () {
        $http({method: 'POST', data: {email: $scope.email, password: $scope.password}, url: 'http://localhost:8080/api/login'}).
            success(function (data, status, headers, config) {
                console.log("successs");
                $scope.tagline = data;

            }).
            error(function (data, status, headers, config) {
                console.log("nope");
                $scope.tagline = "NOPE";
            });
    };

    $http({method: 'GET' ,url: 'http://localhost:8080/api/isAuthenticated'}).
        success(function (data, status, headers, config) {
            console.log("successs");
            $scope.auth = data;

        }).
        error(function (data, status, headers, config) {
            console.log("nope");
            $scope.auth = "NOPE";
        });

});