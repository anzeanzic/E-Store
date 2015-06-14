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