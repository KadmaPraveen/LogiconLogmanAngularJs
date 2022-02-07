angular.module('LogiCon').controller('CurrencyCntrl', ['$scope', 'CurrencyService', '$uibModal', 'Utility', 'UtilityFunc', function ($scope, CurrencyService, $uibModal, Utility, UtilityFunc) {
    $scope.GetCurrencyList = function (skip, take) {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.timeFormat = UtilityFunc.TimeFormat();
        $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
        $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.defaultCountry = UtilityFunc.DefaultCountry();
        CurrencyService.GetCurrencyList(skip, take).then(function (d) {            
            $scope.currencyList = d.data.currencyList;
            $scope.totalItems = d.data.totalItems;
        }, function () { });
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.GetCurrencyList(skip, $scope.limit);
    };

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.GetCurrencyList(0, $scope.limit);

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.EditCurrency = function (CurrencyCode) {
        
        if (CurrencyCode == 'NEW' || CurrencyCode == '' || CurrencyCode == undefined)
            $scope.truefalse = false;
        else
            $scope.truefalse = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/currency/add-currency.html?v=' + Utility.Version,
            controller: 'EditCurrencyCntrl',
            size: 'md',
            resolve: {
                CurrencyCode: function () {
                    return CurrencyCode;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.getData();
        }, function () {

        });
    };

    $scope.DeleteCurrency = function (currencyCode) {
        
        CurrencyService.DeleteCurrency(currencyCode).then(function (d) {
            $scope.getData();
        }, function () { });
    };
}]);



