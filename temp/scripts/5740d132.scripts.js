document.addEventListener("touchmove",function(a){a.preventDefault()},!1);var addToHomeConfig={animationIn:"bubble",animationOut:"drop",lifespan:1e4,expire:2,touchIcon:!0,message:"Install DCU timetables on your iPhone: tap %icon and then <strong>Add to Home Screen</strong>."},dcuTimetablesApp=angular.module("dcuTimetablesApp",[]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!1),b.hashPrefix("!"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl"}).when("/credits",{templateUrl:"views/credits.html"}).when("/:coursecode",{templateUrl:"views/timetable.html",controller:"TimetableCtrl"}).otherwise({redirectTo:"/"})}]);dcuTimetablesApp.controller("MainCtrl",["$location","$routeParams","$scope",function(a,b,c){var d=$.jStorage.get("coursecode",!1);d&&a.path($.jStorage.get("coursecode")),c.getTimetable=function(){c.coursecode!==null&&($.jStorage.set("coursecode",c.coursecode),a.path("/"+c.coursecode))}}]),dcuTimetablesApp.controller("TimetableCtrl",["$scope","$location","$routeParams","$http",function(a,b,c,d){a.showLoader=!0,a.date=moment().format("YYYY-MM-DD");var e={},f=$.jStorage.get("timetable-cached",!1),g=function(){a.day=e[a.date],a.dayDate=moment(a.date,"YYYY-MM-DD").format("DD-MM-YYYY"),a.dayName=moment(a.date,"YYYY-MM-DD").format("dddd")};a.updateEvents=g;var h=function(){a.date=moment(a.date,"YYYY-MM-DD").add("d",1).format("YYYY-MM-DD"),g()};a.nextDay=h;var i=function(){a.date=moment(a.date,"YYYY-MM-DD").subtract("d",1).format("YYYY-MM-DD"),g()};a.prevDay=i,f?(e=$.jStorage.get("timetable"),g(),a.showLoader=!1):d({method:"JSONP",url:"http://api.dcutt.com/index.php?callback=JSON_CALLBACK&coursecode="+c.coursecode}).success(function(b){$.jStorage.set("timetable",b),$.jStorage.set("timetable-cached",!0),$.jStorage.setTTL("timetable-cached",86400),e=b,g(),a.showLoader=!1}).error(function(b){a.dayName="Request failed",a.showLoader=!1})}]),dcuTimetablesApp.controller("SettingsCtrl",["$location",function(a){$.jStorage.flush(),a.path("/")}]),dcuTimetablesApp.directive("timetable",function(){return function(a,b,c){var d=new iScroll("wrapper",{hScrollbar:!1,vScrollbar:!0,bounce:!1,fadeScrollbar:!0}),e=function(){d.refresh()};window.addEventListener("orientationchange",function(){setTimeout(e,500)},!1);var f=function(){a.nextDay(),a.$apply(),d.refresh()},g=function(){a.prevDay(),a.$apply(),d.refresh()};$("body").swipeLeft(function(){f()}),$("body").swipeRight(function(){g()}),$(document).keydown(function(a){a.keyCode==39?f():a.keyCode==37&&g()})}});