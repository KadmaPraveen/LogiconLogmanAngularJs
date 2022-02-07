angular.module('LogiCon').controller('VendorInvoiceCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddVendorInvoice = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/VendorInvoice/add-vendorinvoice.html?v=' + Utility.Version,
            controller: 'addVendorInvoiceCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
}]);


angular.module('LogiCon').controller('addVendorInvoiceCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);