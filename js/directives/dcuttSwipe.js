'use strict';

dcutt.directive('dcuttswipe', function() {
  return function( scope, elem, attrs ) {
    $('body').swipeLeft(function() {
      scope.next();
      scope.$apply();
    });
    $('body').swipeRight(function() {
      scope.prev();
      scope.$apply();
    });
  };
});