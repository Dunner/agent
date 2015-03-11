'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngDevice
 * @description
 * # ngDevice
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngDevice', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      priority: 1500,
      compile: function(element){

        var parent = angular.element(element[0])[0].offsetParent,
            wh = parent.offsetHeight,
            ww = parent.offsetWidth,
            dh = wh,
            dw = wh/2;

        if (ww < dh/2) {
          dh = ww*2;
          dw = ww;
        } else {
          dh = (wh/10 * 8);
          dw = dh/2;
        }

        angular.element(element[0]).css({
          'height': (dh/wh * 100) + '%',
          'width': (dw/ww) * 100 + '%',
          'background': 'black',
          'position': 'absolute',
          'top': ((100 - (dh/wh * 100))/2) +'%',
          'left': ((100 - (dw/ww * 100))/2) +'%',
          'border-width': (dw/150) + 'px'
        });

      },
      template: '<div class="device" ng-transclude></div>'
    };
  });