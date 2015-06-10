angular.module('EStore', ['ui.router', 'ngResource', 'ui.bootstrap']);
angular.module('EStore').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	//$locationProvider.html5Mode(true);
	//TODO:Prefix

	// otherwise return Error
	$urlRouterProvider.otherwise('/error');

	// Home - Action / Last added
	$stateProvider.state('home',
	{
		url: '/',
		templateUrl: 'templates/home-template.html',
		controller: function($scope, SaleFactory, CategoriesFactory) {
			$scope.productsOnSale = SaleFactory.query({ onlyOnSale: true }, function(success) { /*$scope.loading = false;*/ }, function(error) {});
			$scope.categories = CategoriesFactory.query({}, function(success) { /*$scope.loading = false;*/ }, function(error) {});
		}
	});

	// Error
	$stateProvider.state('error',
	{
		url: '/error',
		templateUrl: 'templates/error-template.html'
	});

	// Categories
	$stateProvider.state('categories', {
		url: '/categories',
		templateUrl: 'templates/categories-template.html',
        controller: function($scope, CategoriesFactory){
            $scope.categories = CategoriesFactory.query({});
        }
	});

	// Specific category
	$stateProvider.state('products',
	{
		url: '/category/:categoryID',
		templateUrl: 'templates/categories.products-template.html',
		controller: function($scope, $stateParams, $state, ProductsFactory) {
			$scope.categoryID = $stateParams.categoryID;
			$scope.products = ProductsFactory.query({ 'id': $stateParams.categoryID });
		}
	});

	// Specific item
	$stateProvider.state('products.detail',
	{
		url: '/product/:productID',
		templateUrl: 'templates/categories.details-template.html',
		controller: function($scope, $stateParams, $state, ProductFactory) {
			$scope.product = ProductFactory.get({ 'id': $stateParams.productID });
		}
	});

	// Shopping cart
	$stateProvider.state('shoppingCart', {
		url: '/shoppingcart',
		templateUrl: 'templates/shoppingcart-template.html',
		controller: function($scope, ShoppingCartFactory) {
			$scope.cartFactory = ShoppingCartFactory;
		}
	});

	// Checkout
	$stateProvider.state('shoppingCart.checkout', {
		url: '/checkout',
		templateUrl: 'templates/shoppingcart.checkout-template.html',
		controller:  function ($scope, CheckoutFactory, ShoppingCartFactory) {
			$scope.cartFactory = ShoppingCartFactory;
			/*var newOrder = new CheckoutFactory({items: [], price: {}});
			newOrder.$save();*/
		}
	});

	// About us
	$stateProvider.state('aboutUs', {
		url: '/about',
		templateUrl: 'templates/about-template.html'
	});

	// Privacy policy
	$stateProvider.state('privacyPolicy', {
		url: '/privacypolicy',
		templateUrl: 'templates/privacypolicy-template.html'
	});

	// Cookies
	$stateProvider.state('cookies', {
		url: '/cookies',
		templateUrl: 'templates/cookies-template.html'
	});

});


/*
$stateProvider.state('orders',
{
  url:         '/orders',
  template: '<h2>Submitted a new POST request for an order</h2><p>Check the network tab of your developer tools.</p>',
  controller:  function ($scope, OrderFactory)
  {
      var newOrder = new OrderFactory({items: [], price: {}});
      newOrder.$save();
  }
});
*/

// kosarica, obrazec za nakup, kategorije in link na produkte

// zadnji dodani, akcija - prva stran
// seznam kategorij -> podstran -> vsi izdelki za posamezno kategorijo
// klik na izdelek in detail view izdelka
// kosarica -> klik na gumb
// v kosarici -> nakupno prodajni proces
// pomoc
angular.module('EStore').factory('CategoriesFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories');
});
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
angular.module('EStore').factory('ProductFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products/:id');
});
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
angular.module('EStore').factory('ProductsFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');
});
angular.module('EStore').directive('appDatepicker', function(){
    return {
        restrict: 'E',
        controller: 'DatesController',
        templateUrl: 'templates/datepicker-template.html'
    };
});
angular.module('EStore').controller('DatesController', function($scope){

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
});
angular.module('EStore').controller('EStoreController', function($scope, ShoppingCartFactory) {
	$scope.cart = ShoppingCartFactory;
	$scope.loading = false;
});
angular.module('EStore').controller('SliderController', function($scope, $timeout){

    $scope.interval = 3000;
    $timeout(function() {
    	var loop_end = $scope.sale.length >= 5 ? 5 : $scope.sale.length;
    	$scope.slides = [];
    	for (var i = 0; i < loop_end; i++) {
    		$scope.slides.push({ id: $scope.sale[i].id, img: $scope.sale[i].image, text: $scope.sale[i].name });
    	}
	}, 500);
    //$scope.slides = [{img:'http://lorempixel.com/400/200/sports', text:"Slide 1"}, {img: 'http://lorempixel.com/400/200', text:"Slide 2"}];
});
angular.module('EStore').factory('LoadingFactory', function() {
	return {
		loading: false
	}
});
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
angular.module('EStore').factory('SaleFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products');
});
angular.module('EStore').directive('appModal',  function () {
	return {
		restrict: 'E',
		controller: function($scope, $modal, ShoppingCartFactory) {
			$scope.cartFactory = ShoppingCartFactory;

			$scope.openModal = function () {
				var modalInstance = $modal.open({
	                templateUrl: 'templates/modal-template.html',
	                controller:  'ModalInstanceController',
	                resolve: {
	                    input: function () {
	                        return $scope.cartFactory;
	                    }
	                }
	            });

	            modalInstance.result.then(function(success) {}, function (error) {});
			}
		},
		template: '<button class="btn btn-primary" ng-click="openModal()">Open modal</button>'
	};
});
angular.module('EStore').controller('ModalInstanceController', function($scope, input, $modalInstance){

    $scope.data = input;

    $scope.ok = function() {
        $modalInstance.close('Success');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Dismissed');
    };

});
angular.module('EStore').factory('CheckoutFactory', function($resource){
	return $resource('http://smartninja.betoo.si/api/eshop/orders');
});

angular.module('EStore').directive('checkoutForm', function(){
	return {
		restrict: 'E',
		controller: function($scope) {
		},
		templateUrl: 'templates/checkoutForm-template.html'
	};
});
angular.module('EStore').factory('ShoppingCartFactory', function(){   
	return {
		cart: [],
		AddToCart: function(product) {
			this.cart.push(product);
		},
		CalculateTotalCost: function() {
			var sum = 0;
			if (this.cart.length > 0) {
				for (var i = 0; i < this.cart.length; i++) {
					sum += this.cart[i].price;
				}
			}

			return sum;
		}
	};
});
angular.module('EStore').controller('TypeController', function($scope, $http, $state) {

    $scope.getItems = function(query){
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params:{query : query}}).then(function(response) {
        	return response.data;
     	});
    };
    $scope.onSelect = function($item, $model, $label) {
    	$state.go('products.detail', { 'productID' : $item.id });
    };
});
angular.module('EStore').directive('appTypeahead', function(){
	return {
		restrict: 'E',
		controller: 'TypeController',
		templateUrl: 'templates/typeahead-template.html'
	};
});