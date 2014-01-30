'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ng2300App.services', [])
.value('version', '0.1')

.service('chartService', function($q) {
    this.getChart = function(series, categories, title, xTitle, yTitle, dateFormat) {

        var config = {
            options: {
                chart: {type: 'spline'}
            },
            credits: {enabled: false},
            title: {text: title},

            xAxis: {
                categories: categories,
                title: {text: xTitle},
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat(dateFormat, this.value);
                    },
                    rotation: -45,
                    step: Math.round(categories.length / 15)
                },
                gridLineWidth: 1
            },

            yAxis: {
                title: {text: yTitle}
            },
            series: series
        };

        return config ;
    };

    this.getChartsConfig =  function (data, dateFormat){
        
        var currentService = this;
        var start = data.getPeriods()[0];
        var interval = data.getPeriods()[1]- data.getPeriods()[0];
        //console.log(start);
        //console.log(interval);
        
        var configs = {

        chartConfigTemp : currentService.getChart(
                [
                    {name: 'Indoor',    data: data.getMeasures("temp_in")    },
                    {name: 'Outdoor',   data: data.getMeasures("temp_out")   },
                    {name: 'Windchill', data: data.getMeasures("wind_chill") },
                    {name: 'Dewpoint',  data: data.getMeasures("dewpoint")   }
                ],
                data.getPeriods(),
                'Temperatures', '', '° Celcius', dateFormat
                ),

        chartConfigHum : currentService.getChart(
                [   
                    {name: 'Indoor',    data: data.getMeasures("rel_hum_in")},
                    {name: 'Outdoor',   data: data.getMeasures("rel_hum_out")}
                ],
                data.getPeriods(),
                'Hygrometry', '', '%', dateFormat
                ),
         chartConfigPressure : currentService.getChart(
                [
                    {name: 'Pressure',  data: data.getMeasures("rel_pressure")}
                ],
                data.getPeriods(),
                'Relative Pressure', '', 'hPa', dateFormat
                ),
         chartConfigWind : currentService.getChart(
                [
                    {name: 'Wind',      data: data.getMeasures("windspeed")}
                ],
                data.getPeriods(),
                'Wind speed', '', 'm/s', dateFormat
                )


        };
        return configs;
   };
})

.service('weatherService', function($http, $q) {

    this.getWeatherValues = function(begin, end, group) {

        var deferred = $q.defer();

        $http({method: 'jsonp', url: 'http://www.wilfried-pilon.net/dev/NG2300/services/history.php?begin=' + begin + '&end=' + end + '&group=' + group + "&callback=JSON_CALLBACK"}).
                success(function(data, status, headers, config) {

                    var results = {
                        rows : data,
                        getMeasures : function(measure) {
                            return data.map(
                                function(row){
                                    return parseFloat(row[measure]);
                                }
                            );
                        },
                        getPeriods : function() {
                            return data.map(
                                function(row){
                                    return new Date(row.period);
                                }
                            );
                        }
                    };


                    deferred.resolve( results);
                }).
                error(function(data, status, headers, config) {
                    //deferred.reject(data);
                    console.log("aie...");
                });

        return deferred.promise;

    };

    this.getActual = function(){
        var deferred = $q.defer();
        $http({method: 'jsonp', url: 'http://www.wilfried-pilon.net/dev/NG2300/services/actual.php?callback=JSON_CALLBACK'}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data[0]);
                }).
                error(function(data, status, headers, config) {
                    //deferred.reject(data);
                    console.log("aie...");
                });

        return deferred.promise;
    };
});
