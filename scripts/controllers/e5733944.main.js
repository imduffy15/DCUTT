dcuTimetablesApp.controller('MainCtrl',
  ['$location', '$routeParams', '$scope',
    function($location, $routeParams, $scope) {

      var coursecode = storage.getItem('coursecode') || false;

      if (coursecode) {
          $location.path(coursecode);
      }

      $scope.getTimetable = function() {
          if (!(typeof $scope.coursecode === "undefined")) {
              storage.setItem('coursecode', $scope.coursecode);
              $location.path($scope.coursecode);
          }
      };
    }
  ]
);
