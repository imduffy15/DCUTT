dcuTimetablesApp.controller('MainCtrl',['$location','$routeParams','$scope', function($location, $routeParams, $scope) {
    var coursecode = $.jStorage.get('coursecode', false)

    if(coursecode) {
        $location.path($.jStorage.get('coursecode'));
    }

    $scope.getTimetable = function() {
        if($scope.coursecode !== null) {
            $.jStorage.set('coursecode', $scope.coursecode);
            $location.path('/'+$scope.coursecode);
        }
    };
}]);