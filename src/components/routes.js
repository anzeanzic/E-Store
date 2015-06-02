angular.module('EStore').config(function($stateProvider, $urlRouterProvider) {

	// otherwise return Error
	$urlRouterProvider.otherwise('/error');

	// Home - Action / Last added
	$stateProvider.state('home',
	{
		url: '/',
		templateUrl: 'templates/home-template.html'
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
		templateUrl: 'templates/categories-template.html'
	});

	// Specific category
	$stateProvider.state('categories.list',
	{
		url: '/category/:categoryID',
		templateUrl: 'templates/categories.list-template.html',
		controller: function($scope, $stateParams, $state) {
			$scope.categoryID = $stateParams.categoryID;
		}
	});

	// Specific item
	$stateProvider.state('categories.list.detail',
	{
		url: '/product/:productID',
		templateUrl: 'templates/categories.details-template.html',
		controller: function($scope, $stateParams, $state) {
			$scope.productID = $stateParams.productID;
		}
	});

	// Shopping cart
	$stateProvider.state('shoppingCart', {
		url: '/shoppingcart',
		templateUrl: 'templates/shoppingcart-template.html'
	});

	// Checkout
	$stateProvider.state('shoppingCart.checkout', {
		url: '/checkout',
		templateUrl: 'templates/shoppingcart.checkout-template.html'
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

// kosarica, obrazec za nakup, kategorije in link na produkte

// zadnji dodani, akcija - prva stran
// seznam kategorij -> podstran -> vsi izdelki za posamezno kategorijo
// klik na izdelek in detail view izdelka
// kosarica -> klik na gumb
// v kosarici -> nakupno prodajni proces
// pomoc