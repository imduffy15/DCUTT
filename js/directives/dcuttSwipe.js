'use strict';

dcutt.directive('dcutt-swipe', function() {
  return function( scope, elem, attrs ) {
    $('body').swipeLeft(function() {
      scope.nextDay();
      scope.$apply();
    });
    $('body').swipeRight(function() {
      scope.prevDay();
      scope.$apply();
    });
  };
});