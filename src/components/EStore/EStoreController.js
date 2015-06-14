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