'use strict';

angular.module('keyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client', {
        url: '/client',
        templateUrl: 'app/client/client.html',
        controller: 'ClientCtrl'
      });
  });