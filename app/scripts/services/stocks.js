angular.module('demoApp')
  .service('Stocks', [
    '$http', function($http) {
      var stocks = [];

      var toStock = function(yahooResponseString) {
        if (yahooResponseString.substring(1,3) === '//') {
          yahooResponseString = yahooResponseString.substring(3)
        }
        var yahooResponse = angular.fromJson(yahooResponseString)[0]
        return {
          ticker: yahooResponse.t,
          price:  yahooResponse.l
        }
      }

      var all = function() {
        return stocks;
      }

      var add = function(ticker) {
        var url = 'http://finance.google.com/finance/info\?client\=ig\&q\=NASDAQ:' + ticker;
        var promise = $http.get(url)
        promise.success(function(response) {
          var stock = toStock(response);
          stocks.push(stock);
        });
        return promise;
      };

      return {
        all: all,
        add: add
      }
    }
  ]);
