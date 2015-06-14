angular.module('EStore').factory('ProductFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products/:id');
});