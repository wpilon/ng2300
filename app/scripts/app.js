'use strict';

angular.module('ng2300App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ng2300App.services',
  'ng2300App.filters',
  'ng2300App.directives',
  'frapontillo.ex.filters',
  'highcharts-ng'
])

.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/actual',
    {
        templateUrl :   'views/actual.html',
        controller : 'ActualCtrl'
    });
$routeProvider.when('/history',
    {
        templateUrl :   'views/history.html',
        controller : 'HistoryCtrl'
    });
$routeProvider.when('/climat',
    {
        templateUrl : 'views/climat.html',
        controller : 'ClimatCtrl'
    });
$routeProvider.otherwise(
    {
        redirectTo : '/actual'
    });
}]);
