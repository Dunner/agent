'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngDaySelect
 * @description
 * # ngDaySelect
 * Service in the agencyApp.
 */

angular.module('postApp')
  .directive('ngDaySelect', function($timeout) {
    var ctrl = function($scope, $element) {


      $timeout(function(){
        var gridwidth = 4;
        var gridheight = 8;

        var container = $element;
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
        $scope.dayExpand = function(day) {
          for (var i = 0; i < blocks.length; i++) {
            if (i !== day) {
              var block = angular.element(blocks[i]);
              var bleft = parseInt(block.css('left'));
              if (bleft <= (w / 3)) {
                block.css({
                  'left': (bleft - 300)+'px'
                });
              }else {
                block.css({
                  'left': (bleft + 300)+'px'
                });
              }
            }else{
              var expand = angular.element(blocks[day]);
              expand.css({
                'left': '0px',
                'top': '0px',
                'width': w+'px',
                'height': h+'px',
              })
            }
          }
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
      },1000);


    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<nav ng-transclude></div>'
    };
  });