'use strict';


/**
 * @ngdoc service
 * @name postApp.Posts
 * @description
 * # Posts
 * Service in the postApp.
 */

angular.module('postApp')
   .service('Posts', function ($resource) {
      return $resource('api/posts/:year/:month/:day/:id', {
         year: '@year',
         month: '@month',
         day: '@day',
         id: '@id'
      });
   });