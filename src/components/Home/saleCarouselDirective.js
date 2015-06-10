angular.module('EStore').directive('actionCarousel', function(){
	return {
		restrict: 'E',
		scope: {
			sale: '='
		},
		controller: 'SliderController',
		templateUrl: 'templates/carousel-template.html'
	};
});