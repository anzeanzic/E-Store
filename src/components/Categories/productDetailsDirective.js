angular.module('EStore').directive('productDetails', function(){
	return {
		restrict: 'E',
		scope:{
			product: '='
		},
		controller: function($scope) {
		},
		templateUrl: 'templates/productDetails-template.html'
	};
});