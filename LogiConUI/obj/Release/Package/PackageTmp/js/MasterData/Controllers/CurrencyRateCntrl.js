angular.module('LogiCon').controller('CurrencyRateCntrl', ['$scope', '$uibModal', 'CurrencyService', 'CurrencyRateService', 'Utility', function ($scope, $uibModal, CurrencyService, CurrencyRateService, Utility) {
    $scope.currentPage = 1;
    $scope.limit = 5;

    $scope.GetCurrencyList = function (skip, take) {
        CurrencyService.GetCurrencyList(skip, take).then(function (d) {
            $scope.currencyList = d.data.currencyList;
            $scope.totalItems = d.data.totalItems;
        }, function () { });
    };

    $scope.addItem = function (id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/CurrencyRate/expiry-exchange-details.html?v=' + Utility.Version,
            controller: 'EditExpiryExchangeCntrl',
            size: 'md',
            //currencyRate: {
            //    rate: function () {
            //        return id;
            //    }
            //}
        });

        modalInstance.result.then(function () {
            $scope.getAddress();
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.EditItem = function (index) {        
        $scope.currencyRateList[index].show = true;
    };

    $scope.CancelItem = function (index) {
        $scope.currencyRateList[index].show = false;
    };

    $scope.SaveItem = function (index) {
        $scope.currencyRateList[index].show = false;
    };

    $scope.SaveCurrencyList = function () {
        CurrencyRateService.SaveCurrencyRateList($scope.currencyRateList)
            .then(function (d) {
                
            }, function (err) { });
    };

    $scope.GetItemDetails = function (currencyCode) {
        for (var i = 0; i < $scope.currencyList.length; i++) {
            if ($scope.currencyList[i].CurrencyCode == currencyCode) {
                $scope.code = $scope.currencyList[i].CurrencyCode;
                $scope.description = $scope.currencyList[i].Description;
            }
        }

        CurrencyRateService.CurrencyRateList(currencyCode).then(function (d) {            
            $scope.currencyRateList = d.data.currencyList;
            $scope.lineChartData = d.data.lineChartData;
            $scope.lineCurrencyCode = [currencyCode]
            //console.log($scope.lineCurrencyCode);
        }, function (err) {

        });
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.GetCurrencyList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.GetCurrencyList(0, $scope.limit);
     
    /* chart custom functions */
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    $scope.xLabelFormatFun = function (x) {        
        var month = months[x.getMonth()];
        var year = moment(x).year();
        return year + '-' + month;
    };

    $scope.dateFormatFun = function (x) {        
        var month = months[new Date(x).getMonth()];
        var year = moment(x).year();
        return year + '-' + month;
    };
    
    $scope.viewType = 'Chart';
}]);

