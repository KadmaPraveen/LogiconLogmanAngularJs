angular.module('LogiCon').controller('VendorReverseBillingCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddVendorReverseBilling = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/VendorReverseBilling/add-vendorreversebilling.html?v=' + Utility.Version,
            controller: 'addVendorInvoiceCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
}]);


angular.module('LogiCon').controller('addVendorReverseBillingCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);