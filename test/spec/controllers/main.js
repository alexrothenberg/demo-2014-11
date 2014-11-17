'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    controller = $controller;
    scope = $rootScope.$new();
  }));

  it('should have a list of stocks from the stock service',
     inject(function ($controller, $rootScope) {

      var mockStockService = {
        all: function() {
          return ['stock1', 'stock2', 'stock3'];
        }
      }
      var scope = $rootScope.$new();
      $controller('MainCtrl', {
        $scope: scope,
        Stocks: mockStockService
      });
      expect(scope.stocks.length).toBe(3);
    })
  );

  it('should let us add a stock',
    inject(function ($controller, $rootScope, _$httpBackend_) {
      var responseJson = {
        code: "VOYA",
        column_names: ["Date", "Open"],
        data: [
          ["2014-11-12", 40.1],
          ["2014-11-11", 40.28]
        ]
      };
      _$httpBackend_.expectGET('https://www.quandl.com/api/v1/datasets/WIKI/VOYA.json')
        .respond(responseJson);

      controller('MainCtrl', {
        $scope: scope
      });
      expect(scope.stocks.length).toBe(0);

      scope.newTicker = 'voya'
      scope.addNewTicker();
      _$httpBackend_.flush();

      expect(scope.stocks.length).toBe(1);
      expect(scope.stocks[0].ticker).toBe('VOYA');
      expect(scope.stocks[0].price).toBe(40.1);
    })
  );
});
