angular.module('EStore').factory('SaleFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products');
});