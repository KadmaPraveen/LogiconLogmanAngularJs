angular.module('LogiCon').controller('VerditCreditNoteCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddVendorCreditNote = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/VendorCreditNote/add-vendorcreditnote.html?v=' + Utility.Version,
            controller: 'addVerditCreditNoteCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
}]);


angular.module('LogiCon').controller('addVerditCreditNoteCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);