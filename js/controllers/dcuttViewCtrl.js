'use strict';

dcutt.controller( 'dcuttViewCtrl', function( $scope, $location, $routeParams, $http) {
    
  $scope.date = moment(date).format("YYYY-MM-DD");
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
    $scope.dayName = moment($scope.date, "YYYY-MM-DD").format("dddd");
  }
  $scope.updateEvents = updateEvents;

  var nextDay = function() {
    $scope.date = moment($scope.date, "YYYY-MM-DD").add('d',1).format("YYYY-MM-DD");
    updateEvents();
  }
  $scope.nextDay = nextDay;

  var prevDay = function() {
    $scope.date = moment($scope.date, "YYYY-MM-DD").subtract('d',1).format("YYYY-MM-DD");
    updateEvents();
  }
  $scope.prevDay = prevDay;
});