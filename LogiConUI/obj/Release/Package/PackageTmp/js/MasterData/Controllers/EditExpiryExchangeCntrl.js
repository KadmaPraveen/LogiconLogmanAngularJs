angular.module('LogiCon').controller('EditExpiryExchangeCntrl', ['$scope', '$uibModalInstance', 'UtilityFunc', function ($scope, $uibModalInstance, UtilityFunc) {
    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.cancel = function () {
       
        $uibModalInstance.dismiss('cancel');
    };

    //$scope.currencyRate = currencyRate;
}]);