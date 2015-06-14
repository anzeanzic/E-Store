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