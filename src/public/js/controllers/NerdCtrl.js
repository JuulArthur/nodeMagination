angular.module('MainCtrl').controller('NerdController', ($scope, $http) => {

	$scope.tagline = 'Nothing beats a pocket protector!';

     $http({method: 'GET', url: 'http://localhost:8080/api/nerds'}).
        success((data, status, headers, config) => {
             $scope.nerds = data[0].name
        }).
        error((data, status, headers, config) => {
             $scope.nerds = data
        });

});