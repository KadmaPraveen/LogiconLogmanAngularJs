angular.module('LogiCon').controller('PaymentRequestCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddPaymentRequest = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/PaymentRequest/add-paymentrequest.html?v=' + Utility.Version,
            controller: 'AddPaymentRequestCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
}]);

angular.module('LogiCon').controller('AddPaymentRequestCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);