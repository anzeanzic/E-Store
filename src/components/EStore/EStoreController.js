angular.module('EStore').controller('EStoreController', function($scope, ShoppingCartFactory) {
	$scope.cart = ShoppingCartFactory;
	$scope.loading = false;
});