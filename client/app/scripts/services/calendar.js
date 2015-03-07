'use strict';


/**
 * @ngdoc service
 * @name postApp.Calendar
 * @description
 * # Calendar
 * Service in the postApp.
 */

angular.module('postApp')
   .service('Calendar', function ($resource) {
      return $resource('api/calendar/:year/:month/:day/:id', {
         year: '@year',
         month: '@month',
         day: '@day',
         id: '@id'
      });
   });