'use strict';

dcutt.controller( 'dcuttViewCtrl', function dcuttViewCtrl( $scope, $location, $routeParams, $http) {
  
  /** 
   * Helper functions for handling dates some devices *cough*iOS*cough*
   * decided to not support yyyy-mm-dd as a valid date
   */
  
  var date_to_str = function(date) {
    function pad(n) {
            return n < 10 ? '0' + n : n
    }
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }
    
  var str_to_date = function(datestr) {
    var parts = datestr.split("-");
    var dt = new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10)
    );
    return dt;
  }
    
  var incr_date = function(datestr) {
    var date = str_to_date(datestr);
    var date = new Date(date.getTime() + 86400000);
    return date_to_str(date);
  }
    
  var dec_date = function(datestr) {
    var date = str_to_date(datestr);
    var date = new Date(date.getTime() - 86400000);
    return date_to_str(date);
  }
  
  var day_name = function(datestr) {
    var name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = str_to_date(datestr);
    return name[date.getDay()];
  }
  
  $scope.date = date_to_str(new Date());
  var timetable = {}
  
  $http({method: 'GET', url: 'http://api.dcutt.com/index.php?coursecode=' + $routeParams.coursecode}).
    success(function(data) {
      timetable = data;
      updateEvents();
    }).
    error(function() {
      $location("/");
    });
    
    var updateEvents = function() {
      $scope.day = timetable[$scope.date];
      $scope.daydate = $scope.date;
      $scope.dayname = day_name($scope.date);
    }
    $scope.updateEvents = updateEvents;
    
    var next = function() {
      $scope.date = incr_date($scope.date);
      updateEvents();
    }
    $scope.next = next;
    
    var prev = function() {
      $scope.date = dec_date($scope.date);
      updateEvents();
    }
    $scope.prev = prev;
});