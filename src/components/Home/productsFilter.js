angular.module('EStore').filter('productsFilter', function(locker){
  
   return function(input, onSale, inStock) {
      var b = [];
      if (onSale != undefined && onSale) {
        locker.put('onSaleFilter', onSale);
        input.forEach(function(item) {
          if (item.onSale == onSale) {
            b.push(item);
          }
        });
      }
      else {
        locker.put('onSaleFilter', false);
        b = input;
      }

      var c = [];
      if (inStock != undefined && inStock) {
        locker.put('inStockFilter', inStock);
        b.forEach(function(item) {
          if (parseInt(item.stock) > 0) {
            c.push(item);
          }
        });
      }
      else {
        locker.put('inStockFilter', false);
        c = b;
      }

     return c;
  };
});