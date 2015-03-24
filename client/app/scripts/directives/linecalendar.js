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
    var ctrl = function($scope, $element) {

      var toPlayWidth = $element[0].offsetParent.offsetHeight;
      $element.css({'height': (toPlayWidth / 10) * 2 +'px'});
      var children = $element.children();

      var monthwrapper = angular.element(children[1]),
          monthscroll = children[1],
          monthexpand = angular.element(monthwrapper.children(0)),
          monthwidth = monthwrapper[0].offsetWidth,
          monthcontainer = angular.element(document.getElementById('months'));
      var daywrapper = angular.element(children[3]),
          dayscroll = children[3],
          dayexpand = angular.element(daywrapper.children(0)),
          daywidth = daywrapper[0].offsetWidth,
          daycontainer = angular.element(document.getElementById('days'));

      var scrollspeed = 300;

      monthexpand.css({'width': (monthwidth * $scope.months.length) + 'px'});

      $scope.getMonth = function(year, month, transition, day) {
        if (!day) {day = 1;}
        if (transition === 'specific') {
          $scope.currentmonth = month - 1;
          Calendar.getMonth(year,month);
        }
        if (transition === 'next') {
          if ($scope.currentmonth < $scope.months.length - 1) {
            $scope.currentmonth = $scope.currentmonth + 1;
          } else {
            $scope.currentmonth = 0;
          }
          Calendar.getMonth(year,$scope.currentmonth+1);
        }
        if (transition === 'previous') {
          if ($scope.currentmonth > 0) {
            $scope.currentmonth = $scope.currentmonth - 1;
          } else {
            $scope.currentmonth = $scope.months.length - 1;
          }
          Calendar.getMonth(year,$scope.currentmonth - 1);
        }
        // Scroll
        $timeout(function(){
          scroll.scrollToX(monthscroll, monthcontainer[0].children[$scope.currentmonth], 0, scrollspeed, function(){
            $scope.getDay(day, 'specific');
          });
        },250);
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
        $scope.toToday();
      },300);

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
          dayGrid();
        },50);
      };

      function dayGrid() {
        var gridwidth = 4;
        var gridheight = 8;
        var collapse = 0;
        var collapses = 0;
        var spacing = 5;
        var container = angular.element(children[2]);
        var blockcontainer =angular.element(container.children(0));
        var blocks = blockcontainer[0].children;
        var rawh = ($element[0].offsetParent.offsetHeight / 10) * 8;
        var h = rawh - (spacing * (gridheight - 1)),
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
      $scope.pickDate = function() {
        $scope.datepick = !$scope.datepick;
        scroll.scrollToX(monthscroll, monthcontainer[0].children[$scope.currentmonth], 0, 200);
        scroll.scrollToX(dayscroll, daycontainer[0].children[$scope.currentday-1], 0, 200);
        dayGrid();
      };
      //Scroll to today
      $scope.toToday = function(){
        $scope.getMonth($scope.year, $scope.today.month, 'specific', $scope.today.day);
      };

      $scope.selectTypes = ['grid', 'line', 'list'];
      $scope.selectDayType = $scope.selectTypes[0];
      $scope.switchDay = function() {
        if ($scope.selectDayType === $scope.selectTypes[0]) {
          $scope.selectDayType = $scope.selectTypes[1];
          switchMode(0);
        }else{
          $scope.selectDayType = $scope.selectTypes[0];
          switchMode(1);
          dayGrid();
          $scope.activeday = 0;
        }
      };
      $scope.selectMonthType = $scope.selectTypes[1];
      $scope.switchMonth = function() {
        if ($scope.selectMonthType === $scope.selectTypes[2]) {
          $scope.selectMonthType = $scope.selectTypes[1];
          switchMode(0);
        }else{
          $scope.selectMonthType = $scope.selectTypes[2];
          switchMode(2);
        }
      };
      function switchMode(mode) {
        switch(mode) {
          case 0:
            //Standard
            angular.element(children[1]).css({'height': '50%'});
            angular.element(children[3]).css({'height': '50%'});
            $element.css({'height': (toPlayWidth / 10) * 2 +'px'});
            break;
          case 1:
            //Expand daygrid
            angular.element(children[1]).css({'height': '20%'});
            angular.element(children[2]).css({'height': '80%'});
            $element.css({'height': toPlayWidth +'px'});
            break;
          case 2:
            //Expand monthlist
            angular.element(children[0]).css({'height': '100%'});
            $element.css({'height': toPlayWidth +'px'});
            break;
          default:
            break;
        }
      }
      switchMode(1);


    };
    return {
      restrict: 'EA',
      link: ctrl,
      templateUrl: 'views/calendar.html'
    };
  });