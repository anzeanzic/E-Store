angular.module('EStore').controller('SliderController', function($scope, $timeout){

    $scope.interval = 3000;
    $timeout(function() {
    	var loop_end = $scope.sale.length >= 5 ? 5 : $scope.sale.length;
    	$scope.slides = [];
    	for (var i = 0; i < loop_end; i++) {
    		$scope.slides.push({ id: $scope.sale[i].id, img: $scope.sale[i].image, text: $scope.sale[i].name });
    	}
	}, 1000);
});