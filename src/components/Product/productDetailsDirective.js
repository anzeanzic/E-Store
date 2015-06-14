angular.module('EStore').directive('productDetails', function(){
	return {
		restrict: 'E',
		scope:{
			product: '=',
			cart: '='
		},
		controller: function($scope) {
		},
		templateUrl: 'templates/productDetails-template.html'
	};
});