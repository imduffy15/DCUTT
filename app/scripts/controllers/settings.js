dcuTimetablesApp.controller('SettingsCtrl',['$location', function($location) {
    $.jStorage.flush();
    $location.path("/");
}]);