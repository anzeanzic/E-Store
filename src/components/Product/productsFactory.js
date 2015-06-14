angular.module('EStore').factory('ProductsFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products');
});