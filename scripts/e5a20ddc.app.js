var storage = window.localStorage;

var dcuTimetablesApp = angular.module('dcuTimetablesApp', [])
  .config(
    ['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
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
        .when('/about', {
          templateUrl: 'views/about.html'
        })
        .when('/error', {
					templateUrl: 'views/settings.html',
          controller: 'ErrorCtrl'
        })
        .when('/:coursecode', {
          templateUrl: 'views/timetable.html',
          controller: 'TimetableCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      }
    ]
  );
