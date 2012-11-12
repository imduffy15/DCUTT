'use strict';

dcutt.controller( 'dcuttViewCtrl', function( $scope, $location, $routeParams, $http) {
  
  /** 
   * Helper functions for handling dates some devices *cough*iOS*cough*
   * decided to not support yyyy-mm-dd as a valid date
   */
  
  var dateToString = function(date) {
    function pad(n) {
      return n < 10 ? '0' + n : n
    }
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }
    
  var stringToDate = function(dateString) {
    var parts = dateString.split("-");
    return new Date(
      parts[0],
      parts[1] - 1,
      parts[2]
    );
  }
    
  var getTomorrowsDate = function(datestr) {
    var date = stringToDate(datestr);
    var date = new Date(date.getTime() + 86400000);
    return dateToString(date);
  }
    
  var getYesterdaysDate = function(datestr) {
    var date = stringToDate(datestr);
    var date = new Date(date.getTime() - 86400000);
    return dateToString(date);
  }
  
  var getDayName = function(datestr) {
    var name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = stringToDate(datestr);
    return name[date.getDay()];
  }
  
  $scope.date = dateToString(new Date());
  var timetable = {}
  
  $http({method: 'GET', url: 'https://api.dcutt.com/index.php?coursecode=' + $routeParams.coursecode}).
    success(function(data) {
      timetable = data;
      updateEvents();
    }).
    error(function() {
      $location("/");
    });
    
  var updateEvents = function() {
    $scope.day = timetable[$scope.date];
    $scope.dayDate = $scope.date;
    $scope.dayName = getDayName($scope.date);
  }
  $scope.updateEvents = updateEvents;
    
  var nextDay = function() {
    $scope.date = getTomorrowsDate($scope.date);
    updateEvents();
  }
  $scope.nextDay = nextDay;
    
  var prevDay = function() {
    $scope.date = getYesterdaysDate($scope.date);
    updateEvents();
  }
  $scope.prevDay = prevDay;
});