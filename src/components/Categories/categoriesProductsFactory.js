angular.module('EStore').factory('CategoriesProductsFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');
});