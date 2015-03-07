'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngMonthSelect
 * @description
 * # ngMonthSelect
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngMonthSelect', function(scroll) {
    var ctrl = function($scope, $element) {

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

      //Month is 1 based
      function daysInMonth(month,year) {
          return new Date(year, month, 0).getDate();
      }

      for (var i = 0 ; i < $scope.months.length; i++) {
        for (var x = 0 ; x < daysInMonth(i+1,2015); x++) {
          // $scope.months[i].days.push('');
        }
      }

      $scope.currentmonth = 0;
      $scope.element = angular.element($element.children()[0]);

      var displaywidth = angular.element($element[0])[0].offsetWidth - 1,
          scrollelement = $element[0].offsetParent,
          scrollto;

      angular.element($element[0]).css({'width': (displaywidth * $scope.months.length) + 'px'});

      $scope.changeMonth = function(month) {
        scrollto = $scope.element[0].children[month];
        scroll.scrollToX(scrollelement, scrollto, 0, 300);
        $scope.currentmonth = month;
      };

      $scope.previousMonth = function() {
        if ($scope.currentmonth > 0) {
          $scope.currentmonth = $scope.currentmonth - 1;
        } else {
          $scope.currentmonth = $scope.months.length - 1;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
      };
      $scope.nextMonth = function() {
        if ($scope.currentmonth < $scope.months.length - 1) {
          $scope.currentmonth = $scope.currentmonth + 1;
        } else {
          $scope.currentmonth = 0;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
      };

      // $scope.$watch(function () { return $element[0].offsetParent.scrollLeft; }, function (newValue, oldValue) {
      //   if (newValue !== oldValue) {
      //       // Do something ...
      //       console.log(newValue, $element[0].children[0].children);
      //   }
      // });

      $scope.yearo = 2015;
      $scope.calendar = {
        2015: {
          1: {name: 'Jan', days:{}},
          2: {name: 'Feb', days:{}},
          3: {name: 'Mar', days:{}},
          4: {name: 'Apr', days:{}},
          5: {name: 'May', days:{}},
          6: {name: 'Jun', days:{}},
          7: {name: 'Jul', days:{}},
          8: {name: 'Aug', days:{}},
          9: {name: 'Sep', days:{}},
          10: {name: 'Okt', days:{}},
          11: {name: 'Nov', days:{}},
          12: {name: 'Dec', days:{}}
        }
      };

      for(var i=1; i <= 12; i++){
        var month = $scope.calendar[$scope.yearo][i];
        var ndays = daysInMonth(i, $scope.yearo, 0);
        for(var x=1; x <= ndays; x++) {
          month.days[x] = '';
        }
      }
      console.log($scope.calendar);


    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<nav class="inline calendar" ng-transclude></div>'
    };
  });