angular.module('demoApp')
  .service('Stocks', [
    '$http', function($http) {
      var stocks = [];

      var toStock = function(quandlResponse) {
        return {
          ticker: quandlResponse.code,
          price:  quandlResponse.data[0][1]
        }
      }

      var all = function() {
        return stocks;
      }

      var add = function(ticker) {
        var url = 'https://www.quandl.com/api/v1/datasets/WIKI/' + ticker.toUpperCase() + '.json'
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
