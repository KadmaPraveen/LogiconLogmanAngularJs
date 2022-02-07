angular.module('LogiCon').controller('EditCurrencyCntrl', ['$scope', '$uibModalInstance', 'CurrencyCode', 'CurrencyService', function ($scope, $uibModalInstance, CurrencyCode, CurrencyService) {
    if (CurrencyCode != 'NEW') {
        CurrencyService.GetCurrency(CurrencyCode).then(function (d) {
            $scope.currency = d.data;
        }, function () { });
    }

    $scope.SaveCurrency = function (currency) {
        CurrencyService.SaveCurrency(currency).then(function (d) {
            $uibModalInstance.close();
        }, function () { });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);