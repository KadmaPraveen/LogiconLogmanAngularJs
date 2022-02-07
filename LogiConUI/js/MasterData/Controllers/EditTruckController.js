angular.module('LogiCon').controller('EditTruckController', ['$scope', '$uibModalInstance', 'TruckMasterService', 'OrderEntryService', 'DriverMasterService', 'MerchantProfileService', 'limitToFilter', 'truckId', function ($scope, $uibModalInstance, TruckMasterService, OrderEntryService, DriverMasterService, MerchantProfileService, limitToFilter, truckId) {

    if (truckId != -1) {
        TruckMasterService.GetTruck(truckId).then(function (d) {
            $scope.t = d.data;
            $scope.truefalse = true;
        }, function (err) { });
    }
    $scope.truefalse = false;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.IsfrmTruckValid = false;
    $scope.$watch('frmTruck.$valid', function (isValid) {
        $scope.IsfrmTruckValid = isValid;
    });

    $scope.sizeChanged = function () {
        OrderEntryService.GetSizeType($scope.t.TruckSize).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
        }, function () { })
    };

    $scope.GetLookupData = function () {
        TruckMasterService.GetLookUpData().then(function (d) {            
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.SaveTruck = function (t) {
        if ($scope.IsfrmTruckValid) {
            TruckMasterService.SaveTruck(t).then(function (d) {
                $uibModalInstance.close();
            }, function (err) { });
        }
    };

    $scope.CustomerSelected2 = function (item, type) {
        $scope.t[type] = item.Value;
    };

    $scope.VendorResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'vendor').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.DriverResults = function ($query) {
        return DriverMasterService.SearchDriver($query).then(function (d) {
            
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };    

    $scope.GetLookupData();
}]);