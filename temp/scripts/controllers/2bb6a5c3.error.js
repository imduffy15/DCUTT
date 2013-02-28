dcuTimetablesApp.controller('ErrorCtrl',
  ['$location', '$routeParams', '$scope',
    function($location, $routeParams, $scope) {
      alert("Error processing your request!");
      $location.path('settings');
    }
  ]
);
