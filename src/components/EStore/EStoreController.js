angular.module('EStore').controller('EStoreController', function($scope, ShoppingCartFactory, LoadingFactory) {
	$scope.cart = ShoppingCartFactory;
	$scope.loadingFactory = LoadingFactory;
});