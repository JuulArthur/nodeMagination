/**
 * Created by Juul on 03/09/14.
 */
angular.module('MainCtrl').controller('LoginController', ($scope, $http) => {

    $scope.login = () => {
        $http({method: 'POST', data: {email: $scope.email, password: $scope.password}, url: 'http://localhost:8080/api/login'}).
            success((data, status, headers, config) => {
                console.log("successs");
                $scope.tagline = data;

            }).
            error((data, status, headers, config) => {
                console.log("nope");
                $scope.tagline = "NOPE";
            });
    };

    $http({method: 'GET' ,url: 'http://localhost:8080/api/isAuthenticated'}).
        success((data, status, headers, config) => {
            console.log("successs");
            $scope.auth = data;

        }).
        error((data, status, headers, config) => {
            console.log("nope");
            $scope.auth = "NOPE";
        });

});