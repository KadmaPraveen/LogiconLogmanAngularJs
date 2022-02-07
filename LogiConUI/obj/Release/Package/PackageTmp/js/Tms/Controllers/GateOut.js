angular.module('LogiCon').controller('GateOutCntrl', ['$scope', 'GateOutService', 'OrderEntryService', 'MerchantProfileService', 'limitToFilter', function ($scope, GateOutService, OrderEntryService, MerchantProfileService, limitToFilter) {
    $scope.go = {};
    $scope.getLookupData = function () {
        GateOutService.getLookupData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) {

        });
    };

    $scope.HaulierResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'Transporter').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.AgentResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CustomerSelected = function (item, type) {
        $scope.go[type] = item.Value;
    };

    $scope.sizeChanged = function () {
        OrderEntryService.GetSizeType($scope.go.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
        }, function () { })
    };

    $scope.getLookupData();
}]);