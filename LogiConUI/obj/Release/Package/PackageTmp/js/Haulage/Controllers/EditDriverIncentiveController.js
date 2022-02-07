angular.module('LogiCon').controller('EditDriverIncentiveController', ['$scope', '$uibModalInstance', 'DriverIncentiveService', 'OrderEntryService', 'MerchantProfileService', 'JobCategoryService', 'ChargeCodeService', 'limitToFilter', 'dataObj',
    function ($scope, $uibModalInstance, DriverIncentiveService, OrderEntryService, MerchantProfileService, JobCategoryService, ChargeCodeService, limitToFilter, dataObj) {
        

        $scope.DriverIncentiveDetails = dataObj;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    $scope.GetLookupData = function () {
        DriverIncentiveService.GetLookUpData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.sizeChanged = function () {        
        OrderEntryService.GetSizeType($scope.DriverIncentiveDetails.Size).then(function (d) {            
            $scope.lookUpData.TypeList = d.data;
        }, function () { })
    };

    $scope.JobCategoryChanged = function () {
        JobCategoryService.MovementsByJobCode($scope.DriverIncentiveDetails.JobCategory).then(function (d) {
            $scope.lookUpData.MovementCodeList = d.data;
        }, function (err) { });
    };

    $scope.GetLookupData();

    $scope.isFrmDriverIncentiveValid = false;
    $scope.$watch('frmDriverIncentive.$valid', function (isValid) {
        $scope.isFrmDriverIncentiveValid = isValid;
    });

    $scope.MerchantResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.ChargeCodeResults = function ($query) {        
        return ChargeCodeService.GetChargeCodeSearchByModule(1000, $query).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CustomerSelected2 = function (item, type) {
        $scope.DriverIncentiveDetails[type] = item.Value;
    };

    $scope.SaveDriverIncentive = function (DriverIncentiveDetails) {
        if ($scope.isFrmDriverIncentiveValid) {
            $uibModalInstance.close(DriverIncentiveDetails);            
        }
    };
}]);