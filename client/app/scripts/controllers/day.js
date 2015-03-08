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
    $scope.calendar = Calendar.getCalendar();

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

    for (var t = 0; t < $scope.calendar.year[$stateParams.year][$stateParams.month][$stateParams.day].length; t++) {
      var task = $scope.calendar.year[$stateParams.year][$stateParams.month][$stateParams.day][t];
      $scope.hours[task.hour - 1].push(task);
    }

    $scope.addTask = function(hour) {
      if ($scope.form.task.length > 2) {
        var newtask = { hour: hour, task: $scope.form.task };
        Calendar.addTask($stateParams.year, $stateParams.month, $stateParams.day, newtask,
        function(cb) {
          console.log(task);
          $scope.form = {name: ''};
          $scope.hours[hour-1].push(cb);
        });
      } else {
        $scope.error = 'Too short';
      }
    };

    // delete task
    $scope.deleteTask = function(hour, task, i) {
      Calendar.removeTask($stateParams.year, $stateParams.month, $stateParams.day, task._id,
      function(cb) {
        if (cb) {
          hour.splice(i, 1);
        }
      });
    };


  });
