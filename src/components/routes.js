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
		resolve: {
			ProductsOnSaleObj: function(SaleFactory) {
				return SaleFactory.query({ onlyOnSale: true });
			},
			CategoriesObj: function(CategoriesFactory) {
				return CategoriesFactory.query({});
			},
			LastAddedProductsObj: function(ProductsFactory) {
				return ProductsFactory.query({});
			}
		},
		controller: function($scope, SaleFactory, CategoriesFactory, ProductsFactory, ShoppingCartFactory, ProductsOnSaleObj, CategoriesObj, LastAddedProductsObj, $timeout) {
			//$scope.loadingFactory = LoadingFactory;		
			$scope.productsOnSale = ProductsOnSaleObj;
			$scope.lastAddedProducts = [];
			$timeout(function() {
				if (LastAddedProductsObj.length > 6) {
					for (var i = LastAddedProductsObj.length - 1; i >= (LastAddedProductsObj.length - 6); i--) {
						$scope.lastAddedProducts.push(LastAddedProductsObj[i]);
					}
				}
				else {
					$scope.lastAddedProducts = LastAddedProductsObj;
				}
			}, 1000);
			$scope.categories = CategoriesObj;
			$scope.cart = ShoppingCartFactory;
		}
	});

	// Error
	$stateProvider.state('error',
	{
		url: '/error',
		templateUrl: 'templates/error-template.html'
	});

	// Specific category
	$stateProvider.state('products',
	{
		url: '/category/:categoryID',
		templateUrl: 'templates/categories.products-template.html',
		resolve: {
			CategoriesObj: function(CategoriesFactory) {
				return CategoriesFactory.query({});
			},
			ProductsObj: function(CategoriesProductsFactory, $stateParams) {
				return CategoriesProductsFactory.query({ 'id': $stateParams.categoryID });
			}
		},
		controller: function($scope, $stateParams, $state, CategoriesFactory, CategoriesObj, CategoriesProductsFactory, ProductsObj, ShoppingCartFactory, locker, $timeout) {
			$scope.cart = ShoppingCartFactory;
			$scope.categoryID = parseInt($stateParams.categoryID);
			$scope.categories = CategoriesObj;
			$timeout(function() {
				$scope.categoryName = $scope.categories[0].name;
			}, 500);
			$scope.products = ProductsObj;

			// load filters from localstorage
		    if (locker.has('onSaleFilter')) {
		    	$scope.onSale = locker.get('onSaleFilter');
		    }
		    if (locker.has('inStockFilter')) {
		    	$scope.inStock = locker.get('inStockFilter');
		    }
		}
	});

	// Specific item
	$stateProvider.state('product',
	{
		url: '/product/:productID',
		templateUrl: 'templates/categories.details-template.html',
		resolve: {
			ProductObj: function(ProductFactory, $stateParams) {
				return ProductFactory.get({ 'id': $stateParams.productID });
			}
		},
		controller: function($scope, $stateParams, $state, ProductFactory, ProductObj, ShoppingCartFactory) {
			$scope.product = ProductObj;
			$scope.cart = ShoppingCartFactory;
		}
	});

	// Checkout
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'templates/checkoutForm-template.html',
		controller:  function ($scope, CheckoutFactory, ShoppingCartFactory) {
			$scope.cartFactory = ShoppingCartFactory;
		}
	});

	// About us
	$stateProvider.state('aboutUs', {
		url: '/about',
		templateUrl: 'templates/aboutUs-template.html'
	});

	// Privacy policy
	$stateProvider.state('privacyPolicy', {
		url: '/privacypolicy',
		templateUrl: 'templates/privacypolicy-template.html'
	});

	// Help
	$stateProvider.state('help', {
		url: '/help',
		templateUrl: 'templates/help-template.html'
	});
});