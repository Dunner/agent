'use strict';

/**
 * @ngdoc function
 * @name postApp.controller:appCtrl
 * @description
 * # appCtrl
 * Controller of the postApp
 */
angular.module('postApp')
  .controller('appCtrl', function ($scope, Calendar) {

    var date = new Date();

    $scope.hours = [];
    $scope.form = {name: ''};
    $scope.calendar = Calendar.getCalendar();
    $scope.today = {
      year: parseInt((date.getYear() < 1000) ? date.getYear() + 1900 : date.getYear()),
      month: parseInt(date.getMonth()+1),
      day: parseInt(date.getDate()),
      weekday: parseInt(date.getDay()),
      hour: parseInt(date.getHours())
    };
    $scope.year = $scope.today.year;
    $scope.currentmonth = $scope.today.month - 1;
    $scope.currentday = $scope.today.day;
    $scope.day = $scope.today.day;
    $scope.weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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
    $scope.datepick = false;

    $scope.taskPercent = function(length) {
      if (length !== 0 && length !== 24) {
        length = Math.round(length/24*100)+'%';
        return {
          'width': length
        };
      }
    };

    $scope.toWeek = function(year, month, day) {
      if(month < 10) {month = '0'+month;}
      if(day < 10) {day = '0'+day;}
      var d = new Date(year+'-'+month+'-'+day);
      return $scope.weekdays[d.getDay()];
    };

    $scope.addTask = function() {
      if ($scope.form.task.length > 2) {
        var newtask = { hours: $scope.form.hours, task: $scope.form.task };
        Calendar.addTask($scope.year, $scope.currentmonth + 1, $scope.currentday, newtask,
        function() {
          $scope.form = {task: '', hours: 1};
        });
      } else {
        $scope.error = 'Too short';
      }
    };

    // delete task
    $scope.deleteTask = function(task) {
      console.log($scope.year,$scope.currentmonth+1,$scope.currentday);
      Calendar.removeTask($scope.year, $scope.currentmonth+1, $scope.currentday, task._id,
      function(cb) {
        if (cb) {
          console.log(cb);
        }
      });
    };

    $scope.rotateWeek = function(day) {
      $scope.rotatedweek = $scope.weekdays;
      for(var ad = 0; ad < $scope.weekdays.length; ad++) {
        if ($scope.rotatedweek[3] === day) {
          return;
        }else{
          $scope.rotatedweek = $scope.rotatedweek.slice();
          var temp = $scope.rotatedweek.shift();
          $scope.rotatedweek.push( temp );
        }
      }
    };
    $scope.rotateWeek($scope.weekdays[$scope.today.weekday]);
  });
