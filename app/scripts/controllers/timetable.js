dcuTimetablesApp.controller('TimetableCtrl',['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
    $scope.showLoader = true;
    $scope.date = moment().format("YYYY-MM-DD");
    var timetable = {};
    var cached = $.jStorage.get('timetable-cached', false)
    
    var updateEvents = function() {
        $scope.day = timetable[$scope.date];
        $scope.dayDate = moment($scope.date, "YYYY-MM-DD").format("DD-MM-YYYY");
        $scope.dayName = moment($scope.date, "YYYY-MM-DD").format("dddd");
    };
    $scope.updateEvents = updateEvents;

    var nextDay = function() {
        $scope.date = moment($scope.date, "YYYY-MM-DD").add('d',1).format("YYYY-MM-DD");
        updateEvents();
    };
    $scope.nextDay = nextDay;

    var prevDay = function() {
        $scope.date = moment($scope.date, "YYYY-MM-DD").subtract('d',1).format("YYYY-MM-DD");
        updateEvents();
    };
    $scope.prevDay = prevDay;
    
    if(cached) {
      timetable = $.jStorage.get('timetable');
      updateEvents();
      $scope.showLoader = false;
    } else {
      $http( {method: 'JSONP', url: 'http://api.dcutt.com/index.php?callback=JSON_CALLBACK&coursecode=' + $routeParams.coursecode}).
      success(function(data) {
          $.jStorage.set('timetable', data);
          $.jStorage.set('timetable-cached', true);
          $.jStorage.setTTL("timetable-cached", 86400);
          timetable = data;
          updateEvents();
          $scope.showLoader = false;
      }).
      error(function(data) {
          $scope.dayName = "Request failed";
          $scope.showLoader = false;
      });
    }
}]);
