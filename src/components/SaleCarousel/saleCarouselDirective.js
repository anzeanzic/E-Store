angular.module('EStore').directive('actionCarousel', function(){
	return {
		restrict: 'E',
		scope: {
			sale: '='
		},
		controller: 'SaleCarouselController',
		templateUrl: 'templates/saleCarousel-template.html'
	};
});