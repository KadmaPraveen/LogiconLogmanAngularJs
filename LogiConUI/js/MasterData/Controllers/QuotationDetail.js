angular.module('LogiCon').controller('QuotationDetailCntrl', ['$scope', '$uibModalInstance', 'CustomerQuotationService', 'ChargeCodeService', 'OrderEntryService', 'limitToFilter', 'quotationDetailsObj', function ($scope, $uibModalInstance, CustomerQuotationService, ChargeCodeService, OrderEntryService, limitToFilter, quotationDetailsObj) {
    $scope.data = quotationDetailsObj;
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    var details = {};
    $scope.addDetails = function (details) {
        
        $uibModalInstance.close(details);
    };
}]);