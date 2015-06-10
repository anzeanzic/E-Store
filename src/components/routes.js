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