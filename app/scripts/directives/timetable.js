dcuTimetablesApp.directive('timetable', function() {
  return function (scope, element, attrs) {
    var nextDay = function() {
      scope.nextDay();
      scope.$apply();
    };
    var prevDay = function() {
      scope.prevDay();
      scope.$apply();
    };
    $('body').swipeLeft(function() {
      nextDay();
    });
    $('body').swipeRight(function() {
      prevDay();
    });
    $(document).keydown(function(e){
      if (e.keyCode == 39) { 
        nextDay();
      } else if(e.keyCode == 37) {
        prevDay();
      }
    });
  };
});
