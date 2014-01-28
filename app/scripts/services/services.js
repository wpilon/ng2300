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
        var start = data.periods[0];
        var interval = data.periods[1] - data.periods[0]; // one day
        console.log(start);
        console.log(interval);
        
        var configs = {

        chartConfigTemp : currentService.getChart(
                [
                    {name: 'Indoor',    data: data.temps_in}, 
                    {name: 'Outdoor',   data: data.temps_out}, 
                    {name: 'Windchill', data: data.wind_chills}, 
                    {name: 'Dewpoint',  data: data.dewpoints}, 
                ],
                data.periods,
                'Temperatures', '', '° Celcius', dateFormat
                ),
        chartConfigHum : currentService.getChart(
                [   
                    {name: 'Indoor',    data: data.hum_in}, 
                    {name: 'Outdoor',   data: data.hum_out}, 
                ],
                data.periods,
                'Hygrometry', '', '%', dateFormat
                ),
         chartConfigPressure : currentService.getChart(
                [   {name: 'Pressure',  data: data.pressures}],
                data.periods,
                'Relative Pressure', '', 'hPa', dateFormat
                ),
         chartConfigWind : currentService.getChart(
                [   {name: 'Wind',      data: data.wind_speeds}],
                data.periods,
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
/*
                    var beginDate = new Date(data[0].period);
                    var endDate = new Date(data[data.length - 1].period);

                    var temps_in = [];
                    var temps_out = [];
                    var hum_in = [];
                    var hum_out =[];
                    var dewpoints = [];
                    var periods = [];
                    var pressures = [];
                    var  wind_chills= [];
                    var  wind_speeds= [];
                    var  wind_angles= [];

                    angular.forEach(data, function(entry){
                    //data.forEach(function(entry) {
                        var curDate = new Date(entry.period);
                        var utcPreriod =  Date.UTC(curDate.getYear(), curDate.getMonth(), curDate.getDay(), curDate.getHours(), curDate.getMinutes());
                        
                        periods.push(curDate);

                        temps_in.push(Number(entry.temp_in));
                        temps_out.push(Number(entry.temp_out));
                        hum_in.push(Number(entry.rel_hum_in));
                        hum_out.push(Number(entry.rel_hum_out));
                        dewpoints.push(Number(entry.dewpoint));
                        pressures.push(Number(entry.rel_pressure));
                        wind_chills.push(Number(entry.wind_chill));
                        wind_speeds.push(Number(entry.windspeed));
                        wind_angles.push(Number(entry.wind_angle));
                    });

                    var results = {
                        'periods': periods,

                        'beginDate': beginDate,
                        'endDate': endDate,
                        'temps_in': temps_in,
                        'temps_out': temps_out,
                        'hum_in': hum_in,
                        'hum_out': hum_out,
                        'dewpoints': dewpoints,
                        'pressures' : pressures ,
                        'wind_chills' : wind_chills,
                        'wind_speeds' : wind_speeds,
                        'wind_angles' : wind_angles
                    };
*/
                    deferred.resolve(data);
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
                    console.log(headers);
                    console.log(headers('Cache-Control'));
                });

        return deferred.promise;
    };
});
