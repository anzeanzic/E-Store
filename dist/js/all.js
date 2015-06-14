angular.module('EStore', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-locker', 'ngAnimate']);
angular.module('EStore').config(function(lockerProvider){
	
	//	Setting default driver and namespace
	lockerProvider.setDefaultDriver('local')
		  .setDefaultNamespace('EStore');
	
});

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
angular.module('EStore').factory('CategoriesFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories');
});
angular.module('EStore').factory('CategoriesProductsFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');
});
angular.module('EStore').directive('contact', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/aboutUsContact-template.html',
		controller: function($scope) {
			$scope.SendMessage = function() {
				alert("Sporočilo uspešno poslano!");
			}
		}
	}
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
angular.module('EStore').directive('cookies', function(){
	return {
		restrict: 'E',
		controller: function($scope, locker) {
			$scope.cookiesAllowed = (locker.has('cookies')) ? locker.get('cookies') : false;
			$scope.AllowCookies = function() {
				$scope.cookiesAllowed = true;
				locker.put('cookies', $scope.cookiesAllowed);
			}
		},
		templateUrl: 'templates/cookies-template.html'
	};
});
angular.module('EStore').controller('EStoreController', function($scope, ShoppingCartFactory, LoadingFactory) {
	$scope.cart = ShoppingCartFactory;
});

angular.module('EStore').run(function($rootScope, LoadingFactory, $modal){
	$rootScope.loadingFactory = LoadingFactory;

    $rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
            	$rootScope.loadingFactory.ShowSpinner();
                $rootScope.loadingFactory.HideErrorNotification();
        });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
                $rootScope.loadingFactory.HideSpinner();
                $rootScope.loadingFactory.HideErrorNotification();
        });

   	$rootScope 
   	    .$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams){ 
                $rootScope.loadingFactory.HideSpinner();
                $rootScope.loadingFactory.ShowErrorNotification();
        });
});
angular.module('EStore').directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});
angular.module('EStore').factory('LoadingFactory', function() {
	return {
		loading: false,
		errorNotification: false,
		ShowSpinner: function() {
			this.loading = true;
		},
		HideSpinner: function() {
			this.loading = false;
		},
		ShowErrorNotification: function() {
			this.errorNotification = true;
		},
		HideErrorNotification: function() {
			this.errorNotification = false;
		}
	}
});
angular.module('EStore').filter('productsFilter', function(locker){
  
   return function(input, onSale, inStock) {
      var b = [];
      if (onSale != undefined && onSale) {
        locker.put('onSaleFilter', onSale);
        input.forEach(function(item) {
          if (item.onSale == onSale) {
            b.push(item);
          }
        });
      }
      else {
        locker.put('onSaleFilter', false);
        b = input;
      }

      var c = [];
      if (inStock != undefined && inStock) {
        locker.put('inStockFilter', inStock);
        b.forEach(function(item) {
          if (parseInt(item.stock) > 0) {
            c.push(item);
          }
        });
      }
      else {
        locker.put('inStockFilter', false);
        c = b;
      }

     return c;
  };
});
angular.module('EStore').directive('appModal',  function () {
	return {
		restrict: 'A',
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
		//template: '<button class="btn btn-primary" ng-click="openModal()">Open modal</button>'
		template: '<a ng-click="openModal()"><img src="assets/img/shopping_cart.png" />(Predogled košarice)</a>'
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
angular.module('EStore').directive('productDetails', function(){
	return {
		restrict: 'E',
		scope:{
			product: '=',
			cart: '='
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
	return $resource('http://smartninja.betoo.si/api/eshop/products');
});
angular.module('EStore').controller('SaleCarouselController', function($scope, $timeout){
	$scope.interval = 3000;
    $timeout(function() {
    	var loop_end = $scope.sale.length >= 5 ? 5 : $scope.sale.length;
    	$scope.slides = [];
    	for (var i = 0; i < loop_end; i++) {
    		$scope.slides.push({ id: $scope.sale[i].id, img: $scope.sale[i].image, text: $scope.sale[i].name });
    	}
	}, 500);
});
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
angular.module('EStore').factory('SaleFactory', function($resource) {
	return $resource('http://smartninja.betoo.si/api/eshop/products');
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
angular.module('EStore').factory('ShoppingCartFactory', function(locker, CheckoutFactory){   
	return {
		cart: (locker.has('cart')) ? locker.get('cart') : [],
		AddToCart: function(product) {
			// mogoce notification v kotu, da je shranjeno?
			this.cart.push({ product: product, quantity: 1 });
			locker.put('cart', this.cart);
		},
		EditCartItem: function(product, new_quantity) {
			var product_index = this.cart.indexOf(product);
			this.cart[product_index].quantity = new_quantity;
			locker.put('cart', this.cart);
		},
		RemoveCartItem: function(product) {
			var product_index = this.cart.indexOf(product);
			if (product_index > -1) {
				this.cart.splice(product_index, 1);
				locker.put('cart', this.cart);
			}
		},
		CalculateTotalCost: function() {
			var sum = 0;
			if (this.cart.length > 0) {
				for (var i = 0; i < this.cart.length; i++) {
					sum += (this.cart[i].product.price * this.cart[i].quantity);
				}
			}

			return sum;
		},
		SendOrder: function(firstname, lastname, email, address, country, city, zip) {
			var products = [];
			for (var i = 0; i < this.cart.length; i++) {
				products.push({ id: this.cart[i].product.id, quantity: this.cart[i].quantity });
			}

			var newOrder = new CheckoutFactory({ firstName: firstname, lastName: lastname, email: email, address: address, country: country, city: city, zip: zip, products: products });
			newOrder.$save();
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
    	$state.go('product', { 'productID' : $item.id });
    };
});
angular.module('EStore').directive('appTypeahead', function(){
	return {
		restrict: 'E',
		controller: 'TypeController',
		templateUrl: 'templates/typeahead-template.html'
	};
});