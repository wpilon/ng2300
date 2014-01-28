'use strict';

/* Filters */

angular.module('ng2300App.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  
  .filter('avg', function() {
    return function(input, rounded) {
      var r = (rounded) ? rounded : 0;
      var out;
      if (input) {
        var sum=0;
        var cpt = 0;
        for (var i in input) {
          if (input[i] < out || out === undefined || out === null) {
            sum = sum + input[i];
            cpt++;
          }
        }
      }
      var result = sum / cpt;
      var roundedMultiplicator = Math.pow(10, r);
      return Math.round(result * roundedMultiplicator) / roundedMultiplicator;
    };
  }
)
  


;
