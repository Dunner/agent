'use strict';

/**
 * @ngdoc function
 * @name postApp.controller:dayCtrl
 * @description
 * # dayCtrl
 * Controller of the postApp
 */
angular.module('postApp')
  .controller('dayCtrl', function ($scope, $filter, $stateParams, Calendar) {

    $scope.year = $stateParams.year;
    $scope.month = $stateParams.month;
    $scope.day = $stateParams.day;

    $scope.form = {name: ''};
    $scope.hours = [];

    var date = new Date();
    var day = date.getDate();
    var hour = date.getHours();
    var month = date.getMonth();
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;

    $scope.today = (day + ' ' + month + ' ' + year);
    $scope.hiur = (hour);

    for (var i = 0; i < 24; i++) {
      if ($scope.hours[i] === 'undefined') {
        $scope.hours.push({});
      }
      $scope.hours[i] = [];
    }

    Calendar.get({
      'year':$stateParams.year,
      'month': $stateParams.month,
      'day': $stateParams.day},
      function(response) {
        console.log(response);
      }
    );

    $scope.addPost = function(hour) {
      if ($scope.form.task.length > 2) {

        //Create sound in db
        var newPost = new Calendar({
          hour: hour,
          task: $scope.form.task,
        });
        newPost.$save({
        'year':$stateParams.year,
        'month': $stateParams.month,
        'day': $stateParams.day},
        function(data){
          $scope.form = {name: ''};
          $scope.hours[hour-1].push(data);
          console.log(data);
        });

      } else {
        $scope.error = 'Too short';
      }
    };

    // // delete a todo after checking it
    // $scope.deletePost = function(hour, task, i) {
    //  Posts.remove({
    //   'year':$stateParams.year,
    //   'month': $stateParams.month,
    //   'day': $stateParams.day,
    //   'id': task._id},
    //   function(data) {
    //     if (data) {
    //       hour.splice(i, 1);
    //     }
    //   });
    // };


  });
