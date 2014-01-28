'use strict';

angular.module('ng2300App')
    .controller('ActualCtrl', ['$scope', 'weatherService', function($scope, WeatherService) {
        var promise = WeatherService.getActual();
        promise.then(function(data) {
            $scope.actual = data;
        });
    }]);
