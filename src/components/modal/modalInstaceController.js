angular.module('EStore').controller('ModalInstanceController', function($scope, input, $modalInstance){

    $scope.data = input;

    $scope.ok = function() {
        $modalInstance.close('Success');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Dismissed');
    };

});