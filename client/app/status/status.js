'use strict';

angular.module('keyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('status', {
        url: '/status',
        templateUrl: 'app/status/status.html',
        controller: 'StatusCtrl',
         authenticate: true
      });
  });
