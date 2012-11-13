document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var addToHomeConfig = {
  animationIn: 'bubble',
  animationOut: 'drop',
  lifespan:10000,
  expire:2,
  touchIcon:true,
  message:'Install DCU timetables on your iPhone: tap %icon and then <strong>Add to Home Screen</strong>.'
};

var dcuTimetablesApp = angular.module('dcuTimetablesApp', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/credits', {
        templateUrl: 'views/credits.html'
      })
      .when('/:coursecode', {
        templateUrl: 'views/timetable.html',
        controller: 'TimetableCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
