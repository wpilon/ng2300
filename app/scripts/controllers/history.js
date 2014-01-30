'use strict';
angular.module('ng2300App')

.controller('HistoryCtrl', ['$scope', '$log', 'weatherService', 'chartService', function($scope, $log, WeatherService, ChartService) {

    $scope.hasValues = false;


    $scope.showDaily = function(){
        $scope.period_title = "Last 24 hours";
        var begin = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON();
        var end = new Date().toJSON();
        var group = 'day';
        var dateFormat = "%A %H:%M";
        $scope.showGraphs(begin, end, group, dateFormat);
    };

    $scope.showWeekly = function(){
        $scope.period_title = "Last week (7days)";
        var begin = new Date(new Date().setDate(new Date().getDate() - 7)).toJSON();
        var end = new Date().toJSON();
        var group = 'week';
        var dateFormat = "%A %H:%M";
        $scope.showGraphs(begin, end, group, dateFormat);
    };

    $scope.showMonthly = function(){
        $scope.period_title = "Last month (30days)";
        var begin = new Date( new Date().setDate(new Date().getDate() - 30) ).toJSON();
        var end = new Date().toJSON();
        var dateFormat = "%d/%m/%Y";
        var group = 'month';
        $scope.showGraphs(begin, end, group, dateFormat);
    };

    $scope.showYearly = function(){
        $scope.period_title = "Last year";
        var begin = new Date( new Date().setDate(new Date().getDate() - 365) ).toJSON();
        var end = new Date().toJSON();
        var dateFormat = "%m/%Y";
        var group = 'year';
        $scope.showGraphs(begin, end, group, dateFormat);
    };


    $scope.xAxisTickFormat_Date_Format = function(){
        return function(d){
            return d3.time.format('%x')(new Date(d));
        }
    }

    $scope.showGraphs = function(begin, end,  diviser, dateFormat){
        var promise = WeatherService.getWeatherValues(begin, end, diviser);
        promise.then(function(results) {


            $scope.results =  results;

            $scope.hasValues = true;

            var configs = ChartService.getChartsConfig(results, dateFormat);
            $scope.chartConfigTemp = configs.chartConfigTemp;
            $scope.chartConfigHum = configs.chartConfigHum;
            $scope.chartConfigPressure = configs.chartConfigPressure;
            $scope.chartConfigWind = configs.chartConfigWind;

        });
    };
}]);