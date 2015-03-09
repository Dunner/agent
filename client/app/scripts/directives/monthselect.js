'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngMonthSelect
 * @description
 * # ngMonthSelect
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngMonthSelect', function(scroll, Calendar, $timeout) {
    var ctrl = function($scope, $element) {

      var displaywidth = angular.element($element[0])[0].offsetWidth - 1,
          scrollelement = $element[0].offsetParent;
      $scope.year = 2015;
      $scope.hours = [];
      $scope.currentmonth = 0;
      $scope.day = 1;
      $scope.form = {name: ''};
      $scope.element = angular.element($element.children()[0]);
      $scope.calendar = Calendar.getCalendar();

      $scope.months = [
        {'id': 1, 'name': 'January'},
        {'id': 2, 'name': 'February'},
        {'id': 3, 'name': 'March'},
        {'id': 4, 'name': 'April'},
        {'id': 5, 'name': 'May'},
        {'id': 6, 'name': 'June'},
        {'id': 7, 'name': 'July'},
        {'id': 8, 'name': 'August'},
        {'id': 9, 'name': 'September'},
        {'id': 10, 'name': 'October'},
        {'id': 11, 'name': 'November'},
        {'id': 12, 'name': 'December'}
      ];
      angular.element($element[0]).css({'width': (displaywidth * $scope.months.length) + 'px'});
      function getMonth(year, month) {
        Calendar.getMonth(year,month);
        $scope.mode = 'months';
        $timeout(function(){reDraw();},150);
      }

      $scope.previousMonth = function() {
        if ($scope.currentmonth > 0) {
          $scope.currentmonth = $scope.currentmonth - 1;
        } else {
          $scope.currentmonth = $scope.months.length - 1;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
        angular.element(document.getElementById('days')).css({'left': ($scope.element[0].children[$scope.currentmonth].offsetLeft)+'px'});
        getMonth($scope.year, $scope.currentmonth + 1);
      };
      $scope.nextMonth = function() {
        if ($scope.currentmonth < $scope.months.length - 1) {
          $scope.currentmonth = $scope.currentmonth + 1;
        } else {
          $scope.currentmonth = 0;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
        angular.element(document.getElementById('days')).css({'left': ($scope.element[0].children[$scope.currentmonth].offsetLeft)+'px'});
        getMonth($scope.year, $scope.currentmonth + 1);
      };

      //Get january
      getMonth($scope.year, $scope.currentmonth + 1);

      // DAYS


      $scope.addTask = function(hour) {
        if ($scope.form.task.length > 2) {
          var newtask = { hour: hour, task: $scope.form.task };
          Calendar.addTask($scope.year, $scope.currentmonth + 1, $scope.day, newtask,
          function(cb) {
            $scope.form = {name: ''};
            $scope.hours[hour-1].push(cb);
          });
        } else {
          $scope.error = 'Too short';
        }
      };

      // delete task
      $scope.deleteTask = function(hour, task, i) {
        Calendar.removeTask($scope.year, $scope.currentmonth + 1, $scope.day, task._id,
        function(cb) {
          if (cb) {
            hour.splice(i, 1);
          }
        });
      };

      function reDraw() {
        var gridwidth = 4;
        var gridheight = 8;

        var container = angular.element(document.getElementById('days'));
        var blockcontainer =angular.element(container.children(0));
        var blocks = blockcontainer[0].children;
        var h = container[0].offsetHeight, w = container[0].offsetWidth;
        var bh = h / gridheight, bw = w / gridwidth;
        var collapse = 0;
        var collapses = 0;

        function gridOrder() {
          for (var i = 0; i < blocks.length; i++) {
            var block = angular.element(blocks[i]);
            block.css({
              'left': (collapse * bw)+'px',
              'top': (collapses * bh)+'px',
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
        $scope.dayExpand = function(year,month,day) {
          $scope.day = day;
          $scope.mode = 'hours';
          //reset hours (reseting tasks in the grid)
          for (var i = 0; i < 24; i++) {
            if ($scope.hours[i] === 'undefined') {
              $scope.hours.push({});
            }
            $scope.hours[i] = [];
          }
          //Populate hour mode with tasks
          for (var t = 0; t < $scope.calendar.year[year][month][day].length; t++) {
            var task = $scope.calendar.year[year][month][day][t];
            $scope.hours[task.hour - 1].push(task);
          }

          //Animation transitions for month to day
          for (var a = 0; a < blocks.length; a++) {
            if (a !== day) {
              var block = angular.element(blocks[a]);
              var bleft = parseInt(block.css('left'));
              if (bleft <= (w / 3)) {
                block.css({
                  'left': (bleft - (w/2))+'px'
                });
              }else {
                block.css({
                  'left': (bleft + (w/2))+'px'
                });
              }
            }
          }
          var expand = angular.element(blocks[day]);
          var hours = angular.element(document.getElementById('hours'));
          var changeTo = {
            'left': '0px',
            'top': '0px',
            'width': w+'px',
            'height': h+'px',
          };
          hours.css({
            'width': bw+'px',
            'height': bh+'px',
            'top': expand.css('top'),
            'left': expand.css('left'),
          });
          $timeout(function(){
            expand.css(changeTo);
            hours.css(changeTo);
          },0);
        };

        $scope.taskPercent = function(length) {
          if (length !== 0 && length !== 24) {
            length = Math.round(length/24*100)+'%';
            return {
              'width': length
            };
          }

        };

        gridOrder();
      }

    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<nav class="inline calendar" ng-transclude></div>'
    };

      // $scope.changeMonth = function(month) {
      //   scrollto = $scope.element[0].children[month];
      //   scroll.scrollToX(scrollelement, scrollto, 0, 300);
      //   $scope.currentmonth = month;
      // };
      // $scope.$watch(function () { return $element[0].offsetParent.scrollLeft; }, function (newValue, oldValue) {
      //   if (newValue !== oldValue) {
      //       // Do something ...
      //       console.log(newValue, $element[0].children[0].children);
      //   }
      // });
  });