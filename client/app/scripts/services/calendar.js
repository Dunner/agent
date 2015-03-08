'use strict';


/**
 * @ngdoc service
 * @name postApp.Calendar
 * @description
 * # Calendar
 * factory in the postApp.
 */

angular.module('postApp')
  .factory('Calendar', function ($resource) {
    var factory = [];
    var resource = $resource('api/calendar/:year/:month/:day/:id', {year: '@year', month: '@month', day: '@day', id: '@id'});
    var calendar = {};

    factory.addTask = function(year, month, day, task, callback){
      var Task = factory.talk();
      var newPost = new Task(task);
      newPost.$save({'year': year, 'month': month, 'day': day}, function(response) {
        calendar.year[year][month][day].push(response);
        callback(response);
      });
    };

    factory.removeTask = function(year, month, day, id, callback){
      factory.talk().
      remove({'year':year,'month':month,'day':day,'id':id},
      function(response) {
        for (var i = calendar.year[year][month][day].length - 1; i >= 0; i--) {
          if (calendar.year[year][month][day][i]._id === id) {
            calendar.year[year][month][day].splice(i,1);
          }
        }
        callback(response);
      });
    };

    factory.getMonth = function(year, month){
      if(calendar.year && calendar.year[year] && calendar.year[year][month]) {return;}
      factory.talk().
      get({'year':year,'month': month},
      function(response) {
        if (!calendar.year) {
          calendar.year = {};
          calendar.year[year] = {};
        }
        if (!calendar.year[year][month]) {
          calendar.year[year][month] = {};
        }
        calendar.year[year][month] = response;
      });
    };

    factory.getCalendar = function() {
      return calendar;
    };

    factory.talk = function(){
      return resource;
    };

    return factory;
  });