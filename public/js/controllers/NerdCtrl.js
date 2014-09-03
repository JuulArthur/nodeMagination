angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';

     $http({method: 'GET', url: 'http://localhost:8080/api/nerds'}).
        success(function(data, status, headers, config) {
             $scope.nerds = data[0].name
        }).
        error(function(data, status, headers, config) {
             $scope.nerds = data
        });

});