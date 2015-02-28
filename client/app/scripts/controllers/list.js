'use strict';

/**
 * @ngdoc function
 * @name postApp.controller:listCtrl
 * @description
 * # listCtrl
 * Controller of the postApp
 */
angular.module('postApp')
  .controller('listCtrl', function ($scope, $filter, Posts) {
    
    $scope.form = {name: ''};
    $scope.hours = [];
    
    for (var i = 0; i < 24; i++) {
      if ($scope.hours[i] === 'undefined') {
        $scope.hours.push({});
      }
      $scope.hours[i] = [];
    }
    
    Posts.query(function(response) {
      for (var i = 0; i < response.length; i++) {
        if ($scope.hours[response[i].hour-1] !== 'undefined') {
          $scope.hours[response[i].hour-1].push(response[i]);
        }
      }
    });
    
    $scope.addPost = function(hour) {
      if ($scope.form.task.length > 2) {

        //Create sound in db
        var newPost = new Posts({
          hour: hour,
          task: $scope.form.task,
          slug: $filter('slug')($scope.form.task),
          completed: false
        });
        newPost.$save(function(data){
          $scope.form = {name: ''};
          $scope.hours[hour-1].push(data);
        });

      } else {
        $scope.error = 'Too short';
      }
    };
    
    // delete a todo after checking it
    $scope.deletePost = function(hour, task, i) {
     Posts.remove({slug: task.slug}, function(data) {
        if (data) {
          hour.splice(i, 1);
        }
      });
    };

    
  });
