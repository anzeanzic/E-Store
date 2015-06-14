angular.module('EStore').controller('TypeController', function($scope, $http, $state) {

    $scope.getItems = function(query){
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params:{query : query}}).then(function(response) {
        	return response.data;
     	});
    };
    $scope.onSelect = function($item, $model, $label) {
    	$state.go('product', { 'productID' : $item.id });
    };
});