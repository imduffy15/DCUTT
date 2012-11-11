'use strict';

var dcutt = angular.module('dcutt', []);

dcutt.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $routeProvider.
    when('/', {
      templateUrl: 'partials/prompt.html', 
      controller: "CoursePromptCtrl"
  }).
  when('/error', {
      templateUrl: 'partials/error.html'
  }).
  when('/:coursecode', {
      templateUrl: 'partials/course-view.html', 
      controller: "dcuttViewCtrl"
  });      
}]);
