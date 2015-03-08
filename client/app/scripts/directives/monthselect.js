'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngMonthSelect
 * @description
 * # ngMonthSelect
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngMonthSelect', function(scroll, Calendar) {
    var ctrl = function($scope, $element) {

      var displaywidth = angular.element($element[0])[0].offsetWidth - 1,
          scrollelement = $element[0].offsetParent;
      $scope.year = 2015;
      $scope.currentmonth = 0;
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
      }

      $scope.previousMonth = function() {
        if ($scope.currentmonth > 0) {
          $scope.currentmonth = $scope.currentmonth - 1;
        } else {
          $scope.currentmonth = $scope.months.length - 1;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
        getMonth($scope.year, $scope.currentmonth + 1);
      };
      $scope.nextMonth = function() {
        if ($scope.currentmonth < $scope.months.length - 1) {
          $scope.currentmonth = $scope.currentmonth + 1;
        } else {
          $scope.currentmonth = 0;
        }
        scroll.scrollToX(scrollelement, $scope.element[0].children[$scope.currentmonth], 0, 300);
        getMonth($scope.year, $scope.currentmonth + 1);
      };

      //Get january
      getMonth($scope.year, $scope.currentmonth + 1);

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