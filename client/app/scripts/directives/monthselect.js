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
        {'id': 1, 'name': 'January', 'days': []},
        {'id': 2, 'name': 'February', 'days': []},
        {'id': 3, 'name': 'March', 'days': []},
        {'id': 4, 'name': 'April', 'days': []},
        {'id': 5, 'name': 'May', 'days': []},
        {'id': 6, 'name': 'June', 'days': []},
        {'id': 7, 'name': 'July', 'days': []},
        {'id': 8, 'name': 'August', 'days': []},
        {'id': 9, 'name': 'September', 'days': []},
        {'id': 10, 'name': 'October', 'days': []},
        {'id': 11, 'name': 'November', 'days': []},
        {'id': 12, 'name': 'December', 'days': []}
      ];
      //Month is 1 based
      function daysInMonth(month,year) {
          return new Date(year, month, 0).getDate();
      }
      for (var i = 0 ; i < $scope.months.length; i++) {
        for (var x = 0 ; x < daysInMonth(i+1,2015); x++) {
          $scope.months[i].days.push('');
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
    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<nav class="hour calendar" ng-transclude></div>'
    };
  });