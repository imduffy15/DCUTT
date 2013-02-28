dcuTimetablesApp.controller('ErrorCtrl',
  ['$location', '$routeParams', '$scope',
    function($location, $routeParams, $scope) {
      alert("Error processing your request!");
      storage.clear();
      $location.path('');
    }
  ]
);
