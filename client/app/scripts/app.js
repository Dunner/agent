'use strict';

/**
 * @ngdoc overview
 * @name postApp
 * @description
 * # postApp
 *
 * Main module of the application.
 */
angular
  .module('postApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io'
  ])
  .run()
  .config(['$locationProvider', '$httpProvider',
  function ($locationProvider,   $httpProvider) {
    // State Configurations //
    $httpProvider.defaults.withCredentials = true;
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);