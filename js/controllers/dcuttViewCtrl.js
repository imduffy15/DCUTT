'use strict';

dcutt.controller( 'dcuttViewCtrl', function( $scope, $location, $routeParams, $http) {
  
  /** 
   * Helper functions for handling dates some devices *cough*iOS*cough*
   * decided to not support yyyy-mm-dd as a valid date
   */
  
  var dateToString = function(date) {
    return moment(date).format("YYYY-MM-DD");
  }
    
  var stringToDate = function(dateString) {
    return moment(dateString, "YYYY-MM-DD");
  }
    
  var getTomorrowsDate = function(dateString) {
    return moment(dateString, "YYYY-MM-DD").add('d',1).format("YYYY-MM-DD");
  }
    
  var getYesterdaysDate = function(dateString) {
    return moment(dateString, "YYYY-MM-DD").subtract('d',1).format("YYYY-MM-DD");
  }
  
  var getDayName = function(dateString) {
    return moment(dateString, "YYYY-MM-DD").format("dddd");
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