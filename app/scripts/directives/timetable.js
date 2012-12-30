dcuTimetablesApp.directive('timetable', function() {
  return function (scope, element, attrs) {
    var myScroll = new iScroll('wrapper', { hScrollbar: false, vScrollbar: true, bounce: false, fadeScrollbar: true});
    var refreshScroll = function() {
      myScroll.refresh();
    }
    window.addEventListener('orientationchange', function () { setTimeout(refreshScroll, 500); }, false);
    var nextDay = function() {
      scope.nextDay();
      scope.$apply();
      myScroll.refresh();
    };
    var prevDay = function() {
      scope.prevDay();
      scope.$apply();
      myScroll.refresh();
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
