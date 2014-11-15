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
      var responseJson = [
        {
        "id": "921971350025153"
        ,"t" : "VOYA"
        ,"e" : "NYSE"
        ,"l" : "39.98"
        ,"l_fix" : "39.98"
        ,"l_cur" : "39.98"
        ,"s": "0"
        ,"ltt":"3:28PM EST"
        ,"lt" : "Nov 14, 3:28PM EST"
        ,"lt_dts" : "2014-11-14T15:28:20Z"
        ,"c" : "+0.72"
        ,"c_fix" : "0.72"
        ,"cp" : "1.83"
        ,"cp_fix" : "1.83"
        ,"ccol" : "chg"
        ,"pcls_fix" : "39.26"
        }
      ];
      _$httpBackend_.expectGET('https://finance.google.com/finance/info?client=ig&q=NASDAQ:voya')
        .respond(' // ' + JSON.stringify(responseJson));

      controller('MainCtrl', {
        $scope: scope
      });
      expect(scope.stocks.length).toBe(0);

      scope.newTicker = 'voya'
      scope.addNewTicker();
      _$httpBackend_.flush();

      expect(scope.stocks.length).toBe(1);
      expect(scope.stocks[0].ticker).toBe('VOYA');
      expect(scope.stocks[0].price).toBe(39.98);
    })
  );
});
