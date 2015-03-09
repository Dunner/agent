'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngLineCalendar
 * @description
 * # ngLineCalendar
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngLineCalendar', function(scroll, Calendar, $timeout) {
    var ctrl = function($scope) {

      var monthwrapper = angular.element(document.getElementById('month-scroll')),
          monthscroll = document.getElementById('month-scroll'),
          monthexpand = angular.element(monthwrapper.children(0)),
          monthwidth = monthwrapper[0].offsetWidth,
          monthcontainer = angular.element(document.getElementById('months'));

      var daywrapper = angular.element(document.getElementById('day-scroll')),
          dayscroll = document.getElementById('day-scroll'),
          dayexpand = angular.element(daywrapper.children(0)),
          daywidth = daywrapper[0].offsetWidth,
          daycontainer = angular.element(document.getElementById('days'));

      var scrollspeed = 1000;

      monthexpand.css({'width': (monthwidth * $scope.months.length) + 'px'});

      $scope.getMonth = function(year, month, transition, day) {
        if (!day) {day = 1;}
        if (transition === 'specific') {
          $scope.currentmonth = month - 1;
        }
        if (transition === 'next') {
          if ($scope.currentmonth < $scope.months.length - 1) {
            $scope.currentmonth = $scope.currentmonth + 1;
          } else {
            $scope.currentmonth = 0;
          }
        }
        if (transition === 'previous') {
          if ($scope.currentmonth > 0) {
            $scope.currentmonth = $scope.currentmonth - 1;
          } else {
            $scope.currentmonth = $scope.months.length - 1;
          }
        }
        $timeout(function(){
          scroll.scrollToX(monthscroll, monthcontainer[0].children[$scope.currentmonth], 0, scrollspeed, function(){
            $scope.getDay(day, 'specific');
          });
          dayGrid();
        },250);
        Calendar.getMonth(year,month);
        $scope.mode = 'months';
        //Create days
        $scope.daysinmonth = new Date($scope.year, $scope.currentmonth+1, 0).getDate();
        $scope.days=[];
        for (var i = 1; i <= $scope.daysinmonth; i++) {
          $scope.days.push(i);
        }
        dayexpand.css({'width': (daywidth * $scope.daysinmonth) + 'px'});
        $scope.activeday = 0;
      };

      //Get current month
      $timeout(function(){
        $scope.getMonth($scope.year, $scope.today.month, 'specific', 9);
      },300);
      $timeout(function(){
        scrollspeed = 300;
      },3000);

      // DAYS

      $scope.getDay = function(day, transition) {
        $scope.currentday = day;

        if (transition === 'specific') {
          $scope.currentday = day;
        }
        if (transition === 'next' && $scope.currentday > $scope.daysinmonth) {
          $scope.currentday = 1;
        }
        if (transition === 'previous' && $scope.currentday === 0) {
          $scope.currentday = $scope.daysinmonth;
        }
        $scope.weekday = $scope.toWeek($scope.year, $scope.currentmonth+1, $scope.currentday);
        $timeout(function(){
          scroll.scrollToX(dayscroll, daycontainer[0].children[$scope.currentday-1], 0, scrollspeed);
        },50);
      };

      function dayGrid() {
        var gridwidth = 4;
        var gridheight = 8;
        var collapse = 0;
        var collapses = 0;
        var spacing = 5;
        var container = angular.element(document.getElementById('days-grid'));
        var blockcontainer =angular.element(container.children(0));
        var blocks = blockcontainer[0].children;
        var rawh = blockcontainer[0].offsetParent.offsetParent.offsetHeight - (blockcontainer[0].offsetParent.offsetParent.offsetHeight / 7);
        var h = rawh- (spacing * (gridheight - 1)),
            w = blockcontainer[0].offsetWidth - (spacing * (gridwidth - 1));
        var bh = h / gridheight, bw = (w / gridwidth);
        for (var i = 0; i < blocks.length; i++) {
          var block = angular.element(blocks[i]);
          block.css({
            'left': (collapse * bw)+ (collapse * spacing) +'px',
            'top': (collapses * bh)+ (collapses * spacing)+'px',
            'width': bw+'px',
            'height': bh+'px'
          });
          if (collapse === gridwidth -1) {
            collapses++;
            collapse = -1;
          }
          collapse++;
        }
      }

      $scope.dayExpand = function(day) {
        $scope.activeday = day;
        $scope.mode = 'hours';
      };

    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<div class="full" ng-transclude></div>'
    };

      // $scope.changeMonth = function(month) {
      //   scrollto = $scope.element[0].children[month];
      //   scroll.scrollToX(monthscroll, scrollto, 0, 300);
      //   $scope.currentmonth = month;
      // };
      // $scope.$watch(function () { return $element[0].offsetParent.scrollLeft; }, function (newValue, oldValue) {
      //   if (newValue !== oldValue) {
      //       // Do something ...
      //       console.log(newValue, $element[0].children[0].children);
      //   }
      // });
  });