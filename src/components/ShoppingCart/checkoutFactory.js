angular.module('EStore').factory('CheckoutFactory', function($resource){
	return $resource('http://smartninja.betoo.si/api/eshop/orders');
});
