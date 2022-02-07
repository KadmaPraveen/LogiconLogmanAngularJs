angular.module('LogiCon').controller('addCustomerQuotationCntrl', ['$scope', '$uibModalInstance', 'CustomerQuotationService', 'ChargeCodeService', 'OrderEntryService', 'limitToFilter', 'quotationDetailsObj', function ($scope, $uibModalInstance, CustomerQuotationService, ChargeCodeService, OrderEntryService, limitToFilter, quotationDetailsObj) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    var details = {};
    $scope.addCqDetails = function (details) {
        
        $uibModalInstance.close(details);
    }

    //$scope.lookupData = {};
    //$scope.getLookUpData = function () {
    //    CustomerQuotationService.GetLookupData('quotationdetail').then(function (d) {
    //        $scope.lookupData = d.data;

    //        if (quotationDetailsObj.ItemId != -1) {
    //            $scope.details = quotationDetailsObj;
    //        }
    //    }, function (err) { });
    //};

    //$scope.ChargeCodeResults = function (text) {
    //    return ChargeCodeService.GetChargeCodeSearch(text).then(function (response) {
    //        return limitToFilter(response.data, 15);
    //    }, function (err) { });
    //};

    //$scope.sizeChanged = function () {
    //    OrderEntryService.GetSizeType($scope.details.Size).then(function (d) {
    //        $scope.lookupData.TypeList = d.data;
    //    }, function () { })
    //};

    //$scope.getLookUpData();


}]);