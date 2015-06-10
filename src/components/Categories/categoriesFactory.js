angular.module('EStore').factory('CategoriesFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories');
});