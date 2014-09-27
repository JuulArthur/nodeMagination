/**
 * Created by Juul on 05/09/14.
 */
angular.module('MainCtrl').controller('SignupController', ($scope, $http) => {


    $scope.signup = () => {
        if ($scope.password === $scope.password_retype) {
            $http({method: 'POST', data: {email: $scope.email, password: $scope.password} ,url: 'http://localhost:8080/api/users'}).
                success((data, status, headers, config) => {
                    $scope.user = data[0];
                    console.log("success");

                }).
                error((data, status, headers, config) => {
                    $scope.user = "NOPE";
                    console.log("nei");
                });
        }
    };

});