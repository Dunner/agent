'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngDaySelect
 * @description
 * # ngDaySelect
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngDaySelect', function() {
    var ctrl = function($scope, $element) {
      $scope.days = [];
      for (var i = 30 - 1; i >= 0; i--) {
        $scope.days.push({});
      }
      $element.lol = undefined;
    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<nav ng-transclude></div>'
    };
  });