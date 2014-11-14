'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', [
    '$scope', 'Stocks', function($scope, Stocks) {
      $scope.stocks = Stocks.all();

      $scope.addNewTicker = function() {
        Stocks.add($scope.newTicker);
      };
    }
  ]);
