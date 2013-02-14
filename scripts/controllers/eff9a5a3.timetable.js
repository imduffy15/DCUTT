dcuTimetablesApp.controller('TimetableCtrl',
                            ['$scope', '$location', '$routeParams', '$http',
function($scope, $location, $routeParams, $http) {
    $scope.showLoader = true;
    $scope.date = moment().format('YYYY-MM-DD');
    var timetable = {};
    var cached = storage.getItem('timetable-cached');
    var myScroll = new iScroll('wrapper', { hScrollbar: false, vScrollbar: true, bounce: false, fadeScrollbar: true});
    
    var updateEvents = function() {
        $scope.day = timetable[$scope.date];
        $scope.dayDate = moment($scope.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
        $scope.dayName = moment($scope.date, 'YYYY-MM-DD').format('dddd');
        setTimeout(updateScrolling,300);
    };
    $scope.updateEvents = updateEvents;

    var nextDay = function() {
        $scope.date = moment($scope.date, 'YYYY-MM-DD')
                      .add('d', 1).format('YYYY-MM-DD');
        updateEvents();
    };
    $scope.nextDay = nextDay;

    var prevDay = function() {
        $scope.date = moment($scope.date, 'YYYY-MM-DD').subtract('d', 1)
                      .format('YYYY-MM-DD');
        updateEvents();
    };
    $scope.prevDay = prevDay;

    var updateScrolling = function() {
      myScroll.refresh();
    }

    if(cached) {
      timetable = JSON.parse(storage.getItem('timetable'));
      updateEvents();
      $scope.showLoader = false;
    }

    if ((Math.round(new Date().getTime() / 1000) - cached) > 86400) {
      $http.jsonp(
        'http://api.dcutt.com/index.php?callback=JSON_CALLBACK&coursecode=' + $routeParams.coursecode,
        {timeout:500}
      ).
      success(function(data) {
          storage.setItem('timetable', JSON.stringify(data));
          storage.setItem('timetable-cached',
                          (Math.round(new Date().getTime() / 1000)));
          timetable = data;
          updateEvents();
          $scope.showLoader = false;
      }).
      error(function(data) {
        if(!cached) $location.path('error');
      });
    }
}]);
