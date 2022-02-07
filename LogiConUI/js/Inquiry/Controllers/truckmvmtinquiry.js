angular.module('LogiCon').controller('truckmvmtinquiryCntrl', ['$scope', 'MerchantProfileService', 'TruckMovementService', 'limitToFilter', function ($scope, MerchantProfileService, TruckMovementService, limitToFilter) {
    $scope.bi = {};
    $scope.AgentResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.HaulierResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'Transporter').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.MerchantResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });        
    };

    $scope.getLookupData = function () {
        TruckMovementService.GetLookupData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.getLookupData();
}]);