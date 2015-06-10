angular.module('EStore').directive('productOverview', function(){
	return {
		restrict: 'E',
		scope:{
			product: '=',
			cart: '='
		},
		controller: function($scope) {
		},
		templateUrl: 'templates/productOverview-template.html'
	};
});