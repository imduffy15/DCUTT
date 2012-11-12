'use strict';

var dcutt = angular.module('dcutt', []);

dcutt.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $routeProvider.
  when('/', {
    //redirectTo: '/CASE2'
    templateUrl: 'partials/prompt.html', 
    controller: "dcuttPromptCtrl"
  }).
  when('/error', {
    templateUrl: 'partials/error.html'
  }).
  when('/:coursecode', {
    templateUrl: 'partials/course-view.html', 
    controller: "dcuttViewCtrl"
  });      
}]);


var getTimetable = function() {
  alert("Hello");
  return false;
}